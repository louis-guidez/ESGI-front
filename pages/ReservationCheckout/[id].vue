<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue-sonner'

import StripeCheckout from '~/components/StripeCheckout.vue'

const { reserveAnnonce } = extractStore(useAnnonceStore())
const { user } = extractStore(useUserStore())

// const { t } = useI18n()

const route = useRoute()
const id = computed(() => route.params.id)

const form = ref({
  startDate: undefined,
  endDate: undefined,
})

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    startDate: yup.mixed().required(),
    endDate: yup.mixed().required(),
  }),
})

const stripeCheckoutRef = ref<typeof StripeCheckout | null>(null)

const onSubmit = handleSubmit(async () => {
  if (!user.value?.id) return toast.error('Non authentifié')

  const paymentMethod = await stripeCheckoutRef.value?.handleSubmit()
  console.log('paymentMethod', paymentMethod)

  if (!paymentMethod) return toast.error('Paiement non effectué')

  const res = await reserveAnnonce({
    dateDebut: new Date((form.value.startDate as unknown as DateValue).toString()).toISOString(),
    dateFin: new Date((form.value.endDate as unknown as DateValue).toString()).toISOString(),
    annonceId: Number(id.value),
    utilisateurId: user.value.id,
    payment_method_id: paymentMethod.id,
  })
  console.log('res', res)
  return console.log(form.value)
})
</script>

<template>
  <div class="p-12 flex flex-col gap-12 items-center">
    <h1 class="w-full lg:w-1/2 text-4xl font-bold">Paiement</h1>

    <form class="w-full lg:w-1/2 flex flex-col gap-4" @submit="onSubmit">
      <div class="w-full flex gap-4">
        <FormDatePicker v-model="form.startDate" name="startDate" :label="$t('startDate')" :required="true" class="w-full" />
        <FormDatePicker v-model="form.endDate" name="endDate" :label="$t('endDate')" :required="true" class="w-full" />
      </div>

      <StripeCheckout ref="stripeCheckoutRef" />

      <UiButton type="submit" class="w-full font-bold">
        <span>{{ $t('save') }}</span>
      </UiButton>
    </form>
  </div>
</template>
