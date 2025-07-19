<script setup>
import { UiLogo } from '#components'
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
  <div class="h-[calc(100vh-4rem)] flex flex-col-reverse lg:flex-row justify-end lg:justify-center items-center">
    <div class="size-full lg:w-2/3 flex flex-col items-center justify-center">
      <UiLogo class="text-[5rem]" />

      <div class="p-8 lg:p-16 w-full max-w-xl flex flex-col items-center justify-center gap-2">
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

    <div class="size-full lg:w-1/3 flex items-center justify-center overflow-hidden">
      <NuxtImg
        class="size-full object-cover"
        format="webp"
        src="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  </div>
</template>
