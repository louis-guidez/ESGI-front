<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <NuxtLink to="/" class="inline-block mb-6 text-blue-600 hover:underline font-semibold"> ← Retour à l'accueil </NuxtLink>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-blue-600 mb-6">📸 Gestion des photos</h1>

      <!-- Formulaire d'ajout -->
      <form class="bg-white p-6 rounded shadow mb-8 space-y-4" @submit.prevent="createPhoto">
        <h2 class="text-xl font-semibold">Ajouter une photo</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <input
            v-model="newPhoto.urlChemin"
            placeholder="Chemin"
            class="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input v-model="newPhoto.dateUpload" type="date" class="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Ajouter</button>
        </div>
      </form>

      <!-- Liste des photos -->
      <ul class="space-y-4">
        <li v-for="photo in photos" :key="photo.id" class="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-center gap-4">
          <div v-if="editingId !== photo.id" class="flex-1">
            <p class="text-gray-800">
              <strong>ID :</strong> {{ photo.id }}<br />
              <strong>Chemin :</strong> {{ photo.urlChemin }}<br />
              <strong>Date :</strong> {{ photo.dateUpload }}
            </p>
            <div class="mt-2 flex gap-2">
              <button class="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded" @click="startEdit(photo)">Modifier</button>
              <button class="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" @click="deletePhoto(photo.id)">Supprimer</button>
            </div>
          </div>

          <div v-else class="flex-1 space-y-2">
            <input v-model="editPhoto.urlChemin" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input v-model="editPhoto.dateUpload" type="date" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <div class="flex gap-2 mt-2">
              <button class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded" @click="updatePhoto(photo.id)">Valider</button>
              <button class="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded" @click="cancelEdit">Annuler</button>
            </div>
          </div>
        </li>
      </ul>

      <!-- Toast -->
      <AppToast v-if="showToast" :message="toastMessage" :type="toastType" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import AppToast from '@/components/AppToast.vue'

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// On "capte" l'émission locale
function showFlash({ message, type }) {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const { data: photos, refresh } = await useAsyncData('photos', () => apiFetch('/photos'))

const newPhoto = ref({ urlChemin: '', dateUpload: '' })
const editingId = ref(null)
const editPhoto = ref({ urlChemin: '', dateUpload: '' })

async function createPhoto() {
  try {
    await apiFetch('/photos', {
      method: 'POST',
      body: newPhoto.value,
    })
    newPhoto.value = { urlChemin: '', dateUpload: '' }
    await refresh()
    showFlash({ message: 'Photo ajoutée avec succès !', type: 'success' })
  } catch (error) {
    showFlash({ message: 'Photo non-ajoutée' + error, type: 'error' })
  }
}

function startEdit(photo) {
  editingId.value = photo.id
  editPhoto.value = { urlChemin: photo.urlChemin, dateUpload: photo.dateUpload }
}

async function updatePhoto(id) {
  try {
    await apiFetch(`/photos/${id}`, {
      method: 'PUT',
      body: editPhoto.value,
    })
    editingId.value = null
    await refresh()
    showFlash({ message: 'Photo modifiée avec succès !', type: 'success' })
  } catch (error) {
    showFlash({ message: 'Photo non-modifiée' + error, type: 'error' })
  }
}

function cancelEdit() {
  editingId.value = null
}

async function deletePhoto(id) {
  try {
    await apiFetch(`/photos/${id}`, { method: 'DELETE' })
    await refresh()
    showFlash({ message: 'Photo supprimée !', type: 'success' })
  } catch (error) {
    showFlash({ message: 'Photo non-supprimée' + error, type: 'error' })
  }
}
</script>
