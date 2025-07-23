<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue-sonner'

import StripeCheckout from '~/components/StripeCheckout.vue'

const { reserveAnnonce, getReservationsForAnnonce } = extractStore(useAnnonceStore())
const { user } = extractStore(useUserStore())

// const { t } = useI18n()

const reservations = ref<Reservation[]>([])

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

onMounted(async () => {
  const res = await getReservationsForAnnonce(Number(id.value))

  if (!res) return

  reservations.value = res
})

const unavailableDates = computed(() => {
  return reservations.value.flatMap((r) => {
    return Array.from({ length: Math.ceil((new Date(r.dateFin).getTime() - new Date(r.dateDebut).getTime()) / (1000 * 60 * 60 * 24) + 1) }, (_, i) => {
      const date = new Date(r.dateDebut)
      date.setDate(date.getDate() + i + 1)
      return new Date(date)
    })
  })
})
</script>

<template>
  <div class="p-12 flex flex-col gap-12 items-center">
    <h1 class="w-full lg:w-1/2 text-4xl font-bold">Réservation et Paiement</h1>

    <form class="w-full lg:w-1/2 flex flex-col gap-4" @submit="onSubmit">
      <div class="w-full flex gap-4">
        <FormDatePicker
          v-model="form.startDate"
          name="startDate"
          :label="$t('startDate')"
          :required="true"
          class="w-full"
          :unavailable-dates="unavailableDates"
          :unavailable-after="form.endDate ? new Date((form.endDate as unknown as Date)?.toString()) : undefined"
        />
        <FormDatePicker
          v-model="form.endDate"
          name="endDate"
          :label="$t('endDate')"
          :required="true"
          class="w-full"
          :unavailable-before="form.startDate ? new Date((form.startDate as unknown as Date)?.toString()) : undefined"
          :unavailable-dates="unavailableDates"
        />
      </div>

      <StripeCheckout ref="stripeCheckoutRef" />

      <UiButton type="submit" class="w-full font-bold">
        <span>{{ $t('save') }}</span>
      </UiButton>
    </form>
  </div>
</template>
