<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <NuxtLink to="/" class="inline-block mb-6 text-blue-600 hover:underline font-semibold"> ← Retour à l'accueil </NuxtLink>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-blue-600 mb-6">📄 Gestion des users</h1>

      <form class="bg-white p-6 rounded shadow mb-8 space-y-4" @submit.prevent="createItem">
        <h2 class="text-xl font-semibold">Ajouter</h2>
        <div class="flex flex-col gap-4">
          <div v-for="field in fields" :key="field">
            <input v-model="newItem[field]" :placeholder="field" class="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Ajouter</button>
        </div>
      </form>

      <ul class="space-y-4">
        <li v-for="item in items" :key="item.id" class="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-center gap-4">
          <div v-if="editingId !== item.id" class="flex-1">
            <p class="text-gray-800">
              <span v-for="field in fields" :key="field">
                <strong>{{ field }} :</strong> {{ item[field] }}<br />
              </span>
            </p>
            <div class="mt-2 flex gap-2">
              <button class="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded" @click="startEdit(item)">Modifier</button>
              <button class="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" @click="deleteItem(item.id)">Supprimer</button>
            </div>
          </div>

          <div v-else class="flex-1 space-y-2">
            <div v-for="field in fields" :key="field">
              <input v-model="editItem[field]" :placeholder="field" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div class="flex gap-2 mt-2">
              <button class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded" @click="updateItem(item.id)">Valider</button>
              <button class="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded" @click="cancelEdit">Annuler</button>
            </div>
          </div>
        </li>
      </ul>

      <AppToast v-if="showToast" :message="toastMessage" :type="toastType" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import AppToast from '@/components/AppToast.vue'

const resource = 'users'

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

function showFlash({ message, type }) {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const { data: items, refresh } = await useAsyncData(resource, () => $fetch(`http://localhost:8000/api/${resource}`))

const fields = ref([])
const newItem = ref({})
const editingId = ref(null)
const editItem = ref({})

watchEffect(() => {
  if (items.value?.length && fields.value.length === 0) {
    fields.value = Object.keys(items.value[0]).filter((k) => k !== 'id')
    resetNewItem()
  }
})

function resetNewItem() {
  newItem.value = fields.value.reduce((acc, f) => ({ ...acc, [f]: '' }), {})
}

async function createItem() {
  try {
    await $fetch(`http://localhost:8000/api/${resource}`, {
      method: 'POST',
      body: newItem.value,
    })
    resetNewItem()
    await refresh()
    showFlash({ message: 'Enregistrement ajouté avec succès !', type: 'success' })
  } catch (error) {
    showFlash({ message: "Erreur d'ajout: " + error, type: 'error' })
  }
}

function startEdit(item) {
  editingId.value = item.id
  editItem.value = fields.value.reduce((acc, f) => ({ ...acc, [f]: item[f] }), {})
}

async function updateItem(id) {
  try {
    await $fetch(`http://localhost:8000/api/${resource}/${id}`, {
      method: 'PUT',
      body: editItem.value,
    })
    editingId.value = null
    await refresh()
    showFlash({ message: 'Enregistrement modifié avec succès !', type: 'success' })
  } catch (error) {
    showFlash({ message: "Erreur de modification: " + error, type: 'error' })
  }
}

function cancelEdit() {
  editingId.value = null
}

async function deleteItem(id) {
  try {
    await $fetch(`http://localhost:8000/api/${resource}/${id}`, { method: 'DELETE' })
    await refresh()
    showFlash({ message: 'Enregistrement supprimé !', type: 'success' })
  } catch (error) {
    showFlash({ message: "Erreur de suppression: " + error, type: 'error' })
  }
}
</script>

