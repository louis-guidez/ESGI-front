<template>
  <div>
    <div ref="cardElement" class="card-element" />
    <!-- <button :disabled="loading" @click="handleSubmit">
      {{ loading ? 'Paiement...' : 'Payer 20 €' }}
    </button> -->
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { loadStripe, type Stripe, type StripeCardElement } from '@stripe/stripe-js'

const config = useRuntimeConfig()
const stripePromise = loadStripe(config.public.STRIPE_KEY)
const loading = ref(false)
const message = ref<string | undefined>(undefined)
const cardElement = ref<HTMLElement | null>(null)

let stripe: Stripe, elements, card: StripeCardElement

onMounted(async () => {
  stripe = (await stripePromise) as Stripe
  elements = stripe?.elements()

  card = elements?.create('card')
  card?.mount(cardElement.value as HTMLElement)
  // console.log(card)
})

const handleSubmit = async () => {
  loading.value = true
  message.value = undefined

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card,
    billing_details: {
      name: 'Jenny Rosen',
    },
  })

  if (error) {
    message.value = error.message
    loading.value = false
    return
  }

  return paymentMethod
}

defineExpose({
  handleSubmit,
})
</script>

<style scoped>
.card-element {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
}
</style>
