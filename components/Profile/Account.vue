<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import type { InputPlaceAutocompleteValue } from '../Ui/InputPlaceAutocomplete.vue'

const { t } = useI18n()

const { user, updateUser } = extractStore(useUserStore())

const formInfos = ref<{ email: string; name: string; lastname: string; address?: InputPlaceAutocompleteValue['features'][0] }>({
  email: user.value?.email || '',
  name: user.value?.nom || '',
  lastname: user.value?.prenom || '',
  address: {
    properties: {
      formatted: user.value?.adresse ?? '',
    },
  },
})

const formPassword = ref({
  newPassword: '',
  newPasswordConfirmation: '',
})

const { handleSubmit: handleSubmitInfos, setValues: setValuesInfos } = useForm({
  validationSchema: yup.object({
    email: yup.string().required(t('emailRequired')).email(t('emailInvalid')),
    name: yup
      .string()
      .required(t('nameRequired'))
      .min(2, t('fieldMinLength', { length: 2 })),
    lastname: yup
      .string()
      .required(t('lastnameRequired'))
      .min(2, t('fieldMinLength', { length: 2 })),
    address: yup.object(),
  }),
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

const onSubmitInfos = handleSubmitInfos(async () => {
  if (!user.value) {
    throw new Error('No user found')
  }

  const addressData = {}
  if (formInfos.value.address) {
    const { formatted, postcode, country, city } = formInfos.value.address.properties

    Object.assign(addressData, {
      adresse: formatted,
      postalCode: Number(postcode) || null,
      pays: country,
      ville: city,
    })
  }

  await updateUser(user.value.id, {
    email: formInfos.value.email,
    nom: formInfos.value.name,
    prenom: formInfos.value.lastname,
    ...addressData,
  })
})

const onSubmitPassword = handleSubmitPassword(async () => {
  if (!user.value) {
    throw new Error('No user found')
  }

  await updateUser(user.value.id, {
    password: formPassword.value.newPassword,
  })
})

onMounted(() => {
  formInfos.value = {
    email: user.value?.email || '',
    name: user.value?.nom || '',
    lastname: user.value?.prenom || '',
    address: {
      properties: {
        formatted: user.value?.adresse || '',
      },
    },
  }
  setValuesInfos(formInfos.value)
})

watch(
  formInfos,
  () => {
    setValuesInfos(formInfos.value)
  },
  { deep: true },
)
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl font-bold mb-8">{{ $t('account') }}</h1>

    <div class="size-full flex flex-col items-center gap-16">
      <div class="min-w-1/2 w-fit flex flex-col items-center gap-2">
        <h2 class="w-full text-left text-xl font-semibold">{{ $t('personalInformations') }}</h2>
        <form v-if="user" class="w-full" @submit.prevent="onSubmitInfos">
          <FormInput id="email" v-model="formInfos.email" name="email" class="w-full" :label="$t('email')" type="email" />
          <FormInput id="name" v-model="formInfos.name" name="name" class="w-full" :label="$t('name')" />
          <FormInput id="lastname" v-model="formInfos.lastname" name="lastname" class="w-full" :label="$t('lastname')" />
          <FormInputPlaceAutocomplete id="address" v-model="formInfos.address" name="address" class="w-full" :label="$t('address')" />

          <UiButton type="submit" class="w-full font-bold">
            <span>{{ $t('save') }}</span>
          </UiButton>
        </form>
      </div>

      <!-- TODO: check if password is updated well -->
      <div class="min-w-1/2 w-fit flex flex-col items-center gap-2">
        <h2 class="w-full text-left text-xl font-semibold">{{ $t('password') }}</h2>
        <form class="w-full" @submit.prevent="onSubmitPassword">
          <FormInput id="newPassword" v-model="formPassword.newPassword" name="newPassword" class="w-full" :label="$t('newPassword')" type="password" />
          <FormInput
            id="newPasswordConfirmation"
            v-model="formPassword.newPasswordConfirmation"
            name="newPassword"
            class="w-full"
            :label="$t('newPasswordConfirmation')"
            type="password"
          />

          <UiButton type="submit" class="w-full font-bold">
            <span>{{ $t('save') }}</span>
          </UiButton>
        </form>
      </div>
    </div>
  </div>
</template>
