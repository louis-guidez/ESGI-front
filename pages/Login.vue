<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const route = useRoute()

useHead({
  title: t('connection'),
})

const type = ref('login')

const { login, register } = extractStore(useUserStore())

const redirectURL = route.query.redirect ? decodeURIComponent(route.query.redirect) : '/'

const form = ref({
  email: '',
  password: '',
})

const router = useRouter()

const handleLogin = async () => {
  try {
    const user = await login(form.value)
    if (!user) {
      throw new Error('Login failed')
    }
    router.push(redirectURL)
  } catch {
    //
  }
}

const handleRegister = async () => {
  try {
    const request = await register(form.value)
    if (!request) {
      throw new Error('register failed')
    }
    type.value = 'login'
  } catch {
    //
  }
}

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().required(t('emailRequired')).email(t('emailInvalid')),
    password: yup
      .string()
      .required(t('passwordRequired'))
      .min(8, t('PasswordMinLength', { length: 8 })),
  }),
})

const onSubmit = handleSubmit(() => {
  return type.value === 'login' ? handleLogin() : handleRegister()
})
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-full md:w-1/2 flex items-center justify-center">
      <div class="p-8 md:p-16 w-full max-w-xl flex flex-col items-center justify-center gap-2">
        <form class="w-full flex flex-col items-center justify-center gap-4" @submit.prevent="onSubmit">
          <FormInput id="email" v-model="form.email" name="email" class="w-full" :label="$t('email')" type="email" />
          <FormInput id="password" v-model="form.password" name="password" class="w-full" :label="$t('password')" type="password" />

          <UiButton type="submit" class="w-full font-bold">
            <span v-if="type === 'login'">{{ $t('login') }}</span>
            <span v-else>{{ $t('createAnAccount') }}</span>
          </UiButton>
        </form>
        <UiButton intent="ghost" class="w-full" @click="type = type === 'login' ? 'register' : 'login'">
          <span v-if="type === 'login'">{{ $t('createAnAccount') }}</span>
          <span v-else>{{ $t('login') }}</span>
        </UiButton>
      </div>
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
