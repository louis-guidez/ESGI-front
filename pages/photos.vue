<!-- pages/photos.vue -->
<template>
  <div>
    <h1>Photos</h1>

    <form @submit.prevent="createPhoto">
      <input v-model="newPhoto.urlChemin" placeholder="Chemin" />
      <input v-model="newPhoto.dateUpload" type="date" placeholder="Date" />
      <button type="submit">Ajouter</button>
    </form>

    <ul>
      <li v-for="photo in photos" :key="photo.id">
        <div v-if="editingId !== photo.id">
          {{ photo.id }} - {{ photo.urlChemin }} - {{ photo.dateUpload }}
          <button @click="startEdit(photo)">Modifier</button>
          <button @click="deletePhoto(photo.id)">Supprimer</button>
        </div>
        <div v-else>
          <input v-model="editPhoto.urlChemin" />
          <input v-model="editPhoto.dateUpload" type="date" />
          <button @click="updatePhoto(photo.id)">Valider</button>
          <button @click="cancelEdit">Annuler</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { data: photos, refresh } = await useAsyncData('photos', () =>
  $fetch('http://localhost:8000/api/photos')
)

const newPhoto = ref({ urlChemin: '', dateUpload: '' })
const editingId = ref(null)
const editPhoto = ref({ urlChemin: '', dateUpload: '' })

async function createPhoto() {
  await $fetch('http://localhost:8000/api/photos', {
    method: 'POST',
    body: newPhoto.value,
  })
  newPhoto.value = { urlChemin: '', dateUpload: '' }
  await refresh()
}

function startEdit(photo) {
  editingId.value = photo.id
  editPhoto.value = { urlChemin: photo.urlChemin, dateUpload: photo.dateUpload }
}

async function updatePhoto(id) {
  await $fetch(`http://localhost:8000/api/photos/${id}`, {
    method: 'PUT',
    body: editPhoto.value,
  })
  editingId.value = null
  await refresh()
}

function cancelEdit() {
  editingId.value = null
}

async function deletePhoto(id) {
  await $fetch(`http://localhost:8000/api/photos/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>
