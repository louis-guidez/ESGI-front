<script setup>
const { t } = useI18n()

useHead({
  title: t('connection'),
})

const type = ref('login')

const { login, register } = extractStore(useUserStore())

const form = ref({
  email: '',
  password: '',
})

const router = useRouter()

const handleLogin = () => {
  login(form.value)
  router.push('/')
}

const handleRegister = () => {
  register(form.value)
  type.value = 'register'
}
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-full md:w-1/2 flex items-center justify-center">
      <!-- TODO Handle form and form validation with vee-validate -->
      <form
        class="p-8 md:p-16 w-full max-w-xl flex flex-col items-center justify-center gap-4"
        @submit.prevent="type === 'login' ? handleLogin() : handleRegister()"
      >
        <uiInput v-model="form.email" class="w-full" :label="$t('email')" type="email" />
        <uiInput v-model="form.password" class="w-full" :label="$t('password')" type="password" />
        <uiButton type="submit" class="w-full font-bold">
          <span v-if="type === 'login'">{{ $t('login') }}</span>
          <span v-else>{{ $t('createAnAccount') }}</span>
        </uiButton>
        <uiButton intent="ghost" class="w-full" @click="type = type === 'login' ? 'register' : 'login'">
          <span v-if="type === 'login'">{{ $t('createAnAccount') }}</span>
          <span v-else>{{ $t('login') }}</span>
        </uiButton>
      </form>
    </div>
    <div class="size-full md:w-1/2 hidden md:flex items-center justify-center overflow-hidden">
      <NuxtImg
        class="w-full h-full object-cover"
        format="webp"
        src="https://plus.unsplash.com/premium_photo-1663097421630-a9dd4d2b1bf1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
      />
    </div>
  </div>
</template>
