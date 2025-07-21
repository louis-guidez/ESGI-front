<template>
  <div>
    <div ref="cardElement" class="card-element" />
    <button :disabled="loading" @click="handleSubmit">
      {{ loading ? 'Paiement...' : 'Payer 20 €' }}
    </button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const config = useRuntimeConfig()
const stripePromise = loadStripe(config.public.STRIPE_KEY)
const loading = ref(false)
const message = ref(null)
const cardElement = ref(null)

let stripe, elements, card

onMounted(async () => {
  stripe = await stripePromise
  elements = stripe.elements()
  card = elements.create('card')
  card.mount(cardElement.value)
})

const handleSubmit = async () => {
  loading.value = true
  message.value = null

  const res = await apiFetch('/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 2000 }), // 20 €
  })

  const { clientSecret } = res

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: { card },
  })

  if (result.error) {
    message.value = result.error.message
  } else if (result.paymentIntent.status === 'succeeded') {
    message.value = '✅ Paiement réussi !'
  }

  loading.value = false
}
</script>

<style scoped>
.card-element {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
}
</style>
