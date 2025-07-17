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

    <div class="container">
      <h1>Paiement sécurisé</h1>
      <StripeCheckout />
    </div>

    <div v-if="annonces.length">
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

    <div v-if="response">
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
import StripeCheckout from '~/components/StripeCheckout.vue'

const annonces = ref([])

onMounted(async () => {
  try {
    const res = await $fetch('http://localhost:8000/api/annonces')
    annonces.value = res
  } catch (err) {
    console.error('Erreur lors du chargement des annonces:', err)
  }
})

const form = ref({
  titre: '',
  description: '',
  prix: 0,
  statut: '',
})

const files = ref([])
const response = ref(null)

const handleFileChange = (event) => {
  files.value = Array.from(event.target.files)
}

const submitForm = async () => {
  const formData = new FormData()

  // champs texte
  for (const key in form.value) {
    formData.append(key, form.value[key])
  }

  // fichiers
  files.value.forEach((file) => {
    formData.append('photos[]', file)
  })

  try {
    const res = await $fetch('http://localhost:8000/api/annonces', {
      method: 'POST',
      body: formData,
    })

    response.value = res
  } catch (err) {
    console.error('Erreur:', err)
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
}
</style>
