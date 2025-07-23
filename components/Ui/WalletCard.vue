<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'EUR',
  },
})

const formattedAmount = computed(() =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: 2,
  }).format(props.amount),
)
</script>

<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200 mb-8">
    <div class="flex flex-col justify-between p-6 min-h-[120px]">
      <div>
        <h2 class="text-lg font-semibold text-gray-700">{{ $t('wallet') }} :</h2>
      </div>

      <div class="text-4xl font-bold text-green-600 tracking-tight">
        {{ formattedAmount }}
      </div>
    </div>
    <Icon name="mdi:wallet-outline" class="absolute bottom-4 right-4 text-gray-200 text-6xl" />
  </div>
</template>
