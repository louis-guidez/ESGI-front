<template>
  <div>
    <h2>Créer une annonce</h2>

    <form @submit.prevent="submitForm">
      <input v-model="form.titre" placeholder="Titre" />
      <input v-model="form.description" placeholder="Description" />
      <input v-model="form.prix" type="number" placeholder="Prix" />
      <input v-model="form.statut" placeholder="Statut" />
      <input type="file" multiple @change="handleFileChange" />
      <button type="submit">Envoyer</button>
    </form>

    <div v-if="utilisateurs.length" class="mt-6">
      <h2>👥 Choisir un utilisateur pour discuter</h2>
      <ul>
        <li
          v-for="u in utilisateurs"
          :key="u.id"
          :class="{ selected: contactUserId === u.id }"
          style="cursor: pointer; padding: 5px; border: 1px solid #ccc; margin-bottom: 4px"
          @click="selectUser(u.id)"
        >
          {{ u.prenom }} {{ u.nom }} (ID: {{ u.id }})
        </li>
      </ul>
    </div>

    <div v-if="contactUserId" class="p-4 mt-4">
      <h1 class="text-xl mb-4">Conversation avec l'utilisateur {{ contactUserId }}</h1>
      <Chat :contact-user-id="contactUserId" />
    </div>

    <div class="container mt-6">
      <h1>Paiement sécurisé</h1>
      <StripeCheckout />
    </div>

    <div v-if="annonces.length" class="mt-6">
      <h3>Toutes les annonces :</h3>
      <div v-for="annonce in annonces" :key="annonce.id" style="border: 1px solid #ccc; margin: 1em; padding: 1em">
        <h4>{{ annonce.titre }}</h4>
        <p>{{ annonce.description }}</p>
        <p>Prix : {{ annonce.prix }} €</p>
        <p>Statut : {{ annonce.statut }}</p>

        <div v-if="annonce.photos.length">
          <p>Photos :</p>
          <div style="display: flex; gap: 1em">
            <img v-for="(photo, i) in annonce.photos" :key="i" :src="photo" alt="photo" style="width: 150px; height: auto; object-fit: cover" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="response" class="mt-4">
      <h3>Annonce créée :</h3>
      <p>ID : {{ response.id }}</p>
      <ul>
        <li v-for="(url, i) in response.photos" :key="i">
          <a :href="url" target="_blank">{{ url }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chat from '~/components/Ui/Chat.vue'
import StripeCheckout from '~/components/StripeCheckout.vue'
import { useUserStore } from '@/stores/user'

const { user } = extractStore(useUserStore())

definePageMeta({
  middleware: [
    () => {
      const {
        public: { ENV_MODE },
      } = useRuntimeConfig()

      if (ENV_MODE !== 'dev') {
        return navigateTo('/index')
      }

      return true
    },
  ],
})

const utilisateurs = ref([])
const contactUserId = ref(null)

const annonces = ref([])
const form = ref({
  titre: '',
  description: '',
  prix: 0,
  statut: '',
})
const files = ref([])
const response = ref(null)

const fetchUtilisateurs = async () => {
  try {
    const res = await $fetch('http://localhost:8000/api/utilisateurs', {
      headers: {
        Authorization: `Bearer ${user.value.token}`,
      },
    })

    // On exclut l’utilisateur connecté
    utilisateurs.value = res.filter((u) => u.id !== user.value.id)
  } catch (err) {
    console.error('Erreur chargement utilisateurs:', err)
  }
}

const selectUser = (id) => {
  contactUserId.value = id
}

const handleFileChange = (event) => {
  files.value = Array.from(event.target.files)
}

const submitForm = async () => {
  const formData = new FormData()
  for (const key in form.value) {
    formData.append(key, form.value[key])
  }
  files.value.forEach((file) => {
    formData.append('photos[]', file)
  })

  try {
    const res = await $fetch('http://localhost:8000/api/secure/annonces', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.value.token}`,
      },
      body: formData,
    })
    response.value = res
  } catch (err) {
    console.error('Erreur:', err)
  }
}

onMounted(async () => {
  try {
    const res = await $fetch('http://localhost:8000/api/annonces')
    annonces.value = res
  } catch (err) {
    console.error('Erreur chargement annonces:', err)
  }

  await fetchUtilisateurs()
})
</script>

<style scoped>
.selected {
  background-color: #eef;
}
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
}
</style>
