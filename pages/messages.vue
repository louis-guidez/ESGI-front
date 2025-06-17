<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <NuxtLink to="/home" class="inline-block mb-6 text-blue-600 hover:underline font-semibold"> ← Retour à l'accueil </NuxtLink>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-blue-600 mb-6">📄 Gestion des messages</h1>

      <CrudPage resource="messages" />
    </div>
  </div>
</template>

<script setup>
import CrudPage from '@/components/CrudPage.vue'
</script>

