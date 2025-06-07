<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
    <h1 class="text-4xl font-bold text-blue-600 mb-8">Bienvenue 👋</h1>

    <nav class="bg-white p-6 rounded shadow space-y-4 w-full max-w-md">
      <p class="text-lg font-medium">Navigation</p>
      <select class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" @change="navigate($event)">
        <option disabled selected>Choisir une page</option>
        <option value="/">Accueil</option>
        <option value="/photos">CRUD Photos</option>
        <option value="/annonces">CRUD Annonces</option>
        <option value="/conversations">CRUD Conversations</option>
        <option value="/messages">CRUD Messages</option>
        <option value="/reservations">CRUD Reservations</option>
        <option value="/utilisateurs">CRUD Utilisateurs</option>
        <option value="/utilisateur-conversations">CRUD Utilisateur-Conversations</option>
        <option value="/users">CRUD Users</option>
      </select>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function navigate(event) {
  const value = event.target.value
  if (value) router.push(value)
}
</script>
