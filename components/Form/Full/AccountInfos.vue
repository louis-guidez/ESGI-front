<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import type { InputPlaceAutocompleteValue } from '~/components/Ui/InputPlaceAutocomplete.vue'
import { toast } from 'vue-sonner'
import WalletCard from '@/components/Ui/WalletCard.vue'

const { t } = useI18n()

const { user, updateUser } = extractStore(useUserStore())

const formInfos = ref<{ email: string; name: string; lastname: string; address?: InputPlaceAutocompleteValue['features'][0] }>({
  email: '',
  name: '',
  lastname: '',
  address: {
    properties: {
      formatted: '',
    },
  },
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
    address: yup.object().required(t('addressRequired')),
  }),
})

const onSubmitInfos = handleSubmitInfos(async () => {
  if (!user.value) {
    toast.error('No user found')
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
    nom: formInfos.value.lastname,
    prenom: formInfos.value.name,
    ...addressData,
  })
})

onMounted(() => {
  formInfos.value = {
    email: user.value?.email || '',
    name: user.value?.prenom || '',
    lastname: user.value?.nom || '',
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
  (newValue) => {
    setValuesInfos(newValue)
  },
  { deep: true },
)
</script>

<template>
  <div class="size-full flex flex-col items-center gap-16">
    <div class="min-w-1/2 w-fit flex flex-col items-center gap-2">
      <div class="p-4 w-full max-w-md mx-auto">
        <WalletCard :amount="Number(user?.cagnotte || 0)" />
      </div>
      <h2 class="w-full text-left text-xl font-semibold">{{ $t('personalInformations') }}</h2>
      <form v-if="user" class="w-full flex flex-col gap-4" @submit.prevent="onSubmitInfos">
        <FormInput id="email" v-model="formInfos.email" name="email" class="w-full" :label="$t('email')" type="email" :required="true" />
        <FormInput id="name" v-model="formInfos.name" name="name" class="w-full" :label="$t('name')" :required="true" />
        <FormInput id="lastname" v-model="formInfos.lastname" name="lastname" class="w-full" :label="$t('lastname')" :required="true" />
        <ClientOnly>
          <FormInputPlaceAutocomplete id="address" v-model="formInfos.address" name="address" class="w-full" :label="$t('address')" :required="true" />
        </ClientOnly>

        <UiButton type="submit" class="w-full font-bold">
          <span>{{ $t('save') }}</span>
        </UiButton>
      </form>
    </div>
  </div>
</template>
