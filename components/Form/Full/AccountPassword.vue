<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue-sonner'

const { t } = useI18n()

const { user, updateUser } = extractStore(useUserStore())

const formPassword = ref({
  newPassword: '',
  newPasswordConfirmation: '',
})

const { handleSubmit: handleSubmitPassword } = useForm({
  validationSchema: yup.object({
    password: yup
      .string()
      .required(t('passwordRequired'))
      .min(8, t('PasswordMinLength', { length: 8 })),
    newPassword: yup
      .string()
      .required(t('passwordRequired'))
      .oneOf([yup.ref('password')], t('passwordsDontMatch')),
  }),
})

const onSubmitPassword = handleSubmitPassword(async () => {
  if (!user.value) {
    toast.error('No user found')
    throw new Error('No user found')
  }

  await updateUser(user.value.id, {
    password: formPassword.value.newPassword,
  })
})
</script>

<template>
  <div class="size-full flex flex-col items-center gap-16">
    <!-- TODO: check if password is updated well -->
    <div class="min-w-1/2 w-fit flex flex-col items-center gap-2">
      <h2 class="w-full text-left text-xl font-semibold">{{ $t('password') }}</h2>
      <form class="w-full flex flex-col gap-4" @submit.prevent="onSubmitPassword">
        <FormInput
          id="newPassword"
          v-model="formPassword.newPassword"
          name="newPassword"
          class="w-full"
          :label="$t('newPassword')"
          type="password"
          :required="true"
        />
        <FormInput
          id="newPasswordConfirmation"
          v-model="formPassword.newPasswordConfirmation"
          name="newPassword"
          class="w-full"
          :label="$t('newPasswordConfirmation')"
          type="password"
          :required="true"
        />

        <UiButton type="submit" class="w-full font-bold">
          <span>{{ $t('save') }}</span>
        </UiButton>
      </form>
    </div>
  </div>
</template>
