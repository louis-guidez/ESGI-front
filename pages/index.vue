<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <form class="bg-white p-6 rounded shadow w-80 space-y-4" @submit.prevent="loginUser">
      <h1 class="text-2xl font-bold text-center mb-4">Connexion</h1>
      <FormInput v-model="email" type="email" placeholder="Email" />
      <FormInput v-model="password" type="password" placeholder="Mot de passe" />
      <button type="submit" class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Se connecter</button>
      <NuxtLink to="/register" class="block text-center text-blue-600 hover:underline">Créer un compte</NuxtLink>
    </form>
    <AppToast v-if="error" :message="error" type="error" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppToast from '@/components/AppToast.vue'
import FormInput from '@/components/FormInput.vue'
import { apiFetch } from '@/composables/useApi'

definePageMeta({
  layout: 'auth',
})

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const flash = useState<any>('flash', () => null)

onMounted(() => {
  if (flash.value) {
    error.value = flash.value.message
    flash.value = null
  }
})

async function loginUser() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Email et mot de passe requis'
    return
  }
  try {
    const data = await apiFetch<any>('/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    const userState = useState('user')
    userState.value = data
    const token = useCookie<any>('user_token')
    token.value = data
    router.push('/home')
  } catch (e: any) {
    error.value = e?.data?.message || 'Erreur lors de la connexion'
  }
}
</script>
