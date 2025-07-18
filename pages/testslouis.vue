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
    <div>
      <h2>Chat privé</h2>

      <div>
        <input v-model="messageText" placeholder="Votre message..." />
        <button @click="envoyerMessage">Envoyer</button>
      </div>

      <div>
        <h3>📨 Messages :</h3>
        <div v-for="(msg, index) in messages" :key="index">
          <strong>{{ msg.from }} ➡️ {{ msg.to }} :</strong> {{ msg.contenu }}
        </div>
      </div>
    </div>

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

const messages = ref([])
const messageText = ref('')
const currentUserId = 2        // à remplacer dynamiquement
const contactUserId = 1        // destinataire

const topicId = currentUserId < contactUserId
  ? `${currentUserId}-${contactUserId}`
  : `${contactUserId}-${currentUserId}`

const topicUrl = `https://chat.mercure/conversation/${topicId}`

onMounted(() => {
  const url = new URL('http://localhost:3001/.well-known/mercure')
  url.searchParams.append('topic', topicUrl)

  const eventSource = new EventSource(url)

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    messages.value.push(data)
    console.log('📩 Message reçu:', data)
  }

  eventSource.onerror = (err) => {
    console.error('⚠️ Mercure error:', err)
  }
})

const envoyerMessage = async () => {
  if (!messageText.value) return

  try {
    const res = await fetch('http://localhost:8000/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
        // 'Authorization': 'Bearer VOTRE_TOKEN_JWT_ICI', // si besoin
      },
      body: JSON.stringify({
        contenu: messageText.value,
        to: contactUserId,
      }),
    })

    if (!res.ok) {
      const error = await res.json()
      console.error('❌ Erreur backend:', error)
    } else {
      const responseData = await res.json()
      console.log('✅ Message envoyé:', responseData)
      messageText.value = ''
    }
  } catch (err) {
    console.error('❌ Erreur réseau:', err)
  }
}


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
