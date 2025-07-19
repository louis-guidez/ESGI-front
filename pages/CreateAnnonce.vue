<script setup>
import { ref } from 'vue'

const titre = ref('')
const description = ref('')
const prix = ref(null)
const statut = ref('disponible')
const dateCreation = ref(new Date().toISOString().slice(0, 16)) // ISO datetime-local
const photos = ref([])
const successMessage = ref('')
const errorMessage = ref('')

function handleFileChange(event) {
  photos.value = Array.from(event.target.files)
}

async function submitForm() {
  try {
    const formData = new FormData()
    formData.append('titre', titre.value)
    formData.append('description', description.value)
    formData.append('prix', prix.value)
    formData.append('statut', statut.value)
    formData.append('dateCreation', new Date(dateCreation.value).toISOString())

    photos.value.forEach((photo, i) => {
      formData.append('photos[' + i + ']', photo)
    })

    const { data } = await axios.post('/api/secure/annonces', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    successMessage.value = 'Annonce créée avec succès (ID: ' + data.id + ')'
    errorMessage.value = ''
    // Optionnel : réinitialiser les champs
    titre.value = ''
    description.value = ''
    prix.value = null
    statut.value = 'disponible'
    photos.value = []
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Une erreur est survenue.'
    successMessage.value = ''
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Créer une annonce</h2>

    <form @submit.prevent="submitForm">
      <label>Titre</label>
      <input type="text" v-model="titre" required />

      <label>Description</label>
      <textarea v-model="description" required></textarea>

      <label>Prix (€)</label>
      <input type="number" v-model="prix" required min="0" />

      <label>Statut</label>
      <select v-model="statut">
        <option value="disponible">Disponible</option>
        <option value="vendu">Vendu</option>
      </select>

      <label>Date de création</label>
      <input type="datetime-local" v-model="dateCreation" />

      <label>Photos</label>
      <input type="file" multiple @change="handleFileChange" accept="image/*" />

      <button type="submit">Publier</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}
label {
  display: block;
  margin-top: 15px;
}
input,
textarea,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #008f24;
  color: white;
  border: none;
  cursor: pointer;
}
.success {
  color: green;
  margin-top: 20px;
}
.error {
  color: red;
  margin-top: 20px;
}
</style>
