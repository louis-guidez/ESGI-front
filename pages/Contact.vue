<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as yup from 'yup'

const { t } = useI18n()
const config = useRuntimeConfig()

const form = ref({
  from: '',
  subject: '',
  text: '',
})

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    from: yup.string().required().email(),
    subject: yup.string().required(),
    text: yup.string().required(),
  }),
})

const onSubmit = handleSubmit(async () => {
  try {
    await $fetch('/api/contact-mail', { method: 'POST', body: form.value })

    toast.success(t('messageSent'))
  } catch (err) {
    console.error(err)
    toast.error(t('messageNotSent'))
  }
})
</script>

<template>
  <div class="mt-12 p-12 flex flex-col items-center">
    <div class="w-full lg:w-1/2 flex flex-col items-center text-center">
      <h1 class="text-[5rem] lg:text-[8rem] font-bold">{{ $t('contactUs') }}</h1>
      <h2 class="w-4/5 text-2xl text-gray-600">{{ $t('contactUs_description') }}</h2>
    </div>

    <div class="w-full lg:w-1/2 mt-12 flex flex-col items-center gap-2">
      <ClientOnly>
        <UiMap
          :center="{ lng: 3.0392583, lat: 50.6306175 }"
          :marker="{ lng: 3.0392583, lat: 50.6306175 }"
          :popup="true"
          :popup-text="$t('addressPlaceholder')"
        />
      </ClientOnly>
      <span class="block w-4/5 font-semibold text-center">{{ $t('contactUs_physical') }}</span>
    </div>

    <div class="w-full lg:w-1/2 mt-24 flex flex-col gap-8">
      <h2 class="text-3xl font-bold">{{ $t('sendUsAEmail') }}</h2>
      <form class="w-full flex flex-col items-center justify-center gap-4" @submit="onSubmit">
        <FormInput id="from" v-model="form.from" name="from" class="w-full" :label="$t('contactUs_email')" type="email" />
        <FormInput id="subject" v-model="form.subject" name="subject" class="w-full" :label="$t('contactUs_subject')" type="text" />
        <FormTextarea id="text" v-model="form.text" name="text" class="w-full" :label="$t('contactUs_message')" type="textarea" size="lg" resize />

        <UiButton type="submit" class="w-full">
          <span>{{ $t('contactUs_sendMail') }}</span>
        </UiButton>
      </form>
    </div>

    <div class="w-full lg:w-1/2 mt-24 flex flex-col items-center justify-center gap-4">
      <h2 class="text-3xl font-bold">{{ $t('contactUs') }}</h2>
      <div class="flex flex-col items-center justify-center gap-2">
        <div class="flex items-center gap-2">
          <Icon name="fluent:call-12-filled" />
          <span class="font-semibold">{{ config.public.CONTACT_PHONE_NUMBER }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="fluent:mail-12-filled" />
          <a :href="`mailto:${config.public.CONTACT_MAIL}`" class="font-semibold">{{ config.public.CONTACT_MAIL }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
