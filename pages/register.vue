<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <form class="bg-white p-6 rounded shadow w-80 space-y-4" @submit.prevent="createAccount">
      <h1 class="text-2xl font-bold text-center mb-4">Inscription</h1>
      <input v-model="email" type="email" placeholder="Email" class="w-full border px-4 py-2 rounded" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-full border px-4 py-2 rounded" />
      <button type="submit" class="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">S'inscrire</button>
      <NuxtLink to="/" class="block text-center text-blue-600 hover:underline">Déjà un compte ? Connexion</NuxtLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

function createAccount() {
  if (email.value && password.value) {
    router.push('/')
  }
}
</script>
