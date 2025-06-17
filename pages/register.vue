<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <form class="bg-white p-6 rounded shadow w-80 space-y-4" @submit.prevent="createAccount">
      <h1 class="text-2xl font-bold text-center mb-4">Inscription</h1>
      <input v-model="email" type="email" placeholder="Email" class="w-full border px-4 py-2 rounded" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-full border px-4 py-2 rounded" />
      <button type="submit" class="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">S'inscrire</button>
      <NuxtLink to="/" class="block text-center text-blue-600 hover:underline">Déjà un compte ? Connexion</NuxtLink>
    </form>
    <AppToast v-if="error" :message="error" type="error" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppToast from '@/components/AppToast.vue'
import { apiFetch } from '@/composables/useApi'
import { useFlash } from '@/composables/useFlash'

definePageMeta({
  layout: 'auth',
})

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { setFlash } = useFlash()

async function createAccount() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Email et mot de passe requis'
    return
  }
  try {
    await apiFetch('/register', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    setFlash('Compte créé, connectez-vous', 'success')
    router.push('/')
  } catch (e: any) {
    error.value = e?.data?.message || "Erreur lors de l'inscription"
  }
}
</script>
