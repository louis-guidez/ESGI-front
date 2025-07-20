<script setup>
import { ref, onMounted } from 'vue'
import StripeCheckout from '@/components/StripeCheckout.vue'
import { apiFetch } from '@/composables/useApi'

const route = useRoute()
const annonce = ref(null)
const loading = ref(false)

onMounted(async () => {
  const id = route.query.id
  if (!id) return
  try {
    loading.value = true
    annonce.value = await apiFetch(`/annonces/${id}`)
  } catch (err) {
    console.error('Erreur chargement annonce:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-4 flex flex-col items-center gap-4">
    <div v-if="loading" class="italic">{{ $t('loading') }}</div>
    <div v-else-if="annonce" class="max-w-3xl w-full flex flex-col gap-4">
      <div v-if="annonce.photos?.length" class="flex gap-2 overflow-x-auto">
        <img v-for="(photo, index) in annonce.photos" :key="index" :src="photo" alt="photo" class="h-40 object-cover rounded" />
      </div>
      <h1 class="text-3xl font-bold">{{ annonce.titre }}</h1>
      <p>{{ annonce.description }}</p>
      <div class="text-lg font-semibold">{{ annonce.prix }}€</div>
      <div class="text-sm text-gray-600">{{ annonce.user?.email }}</div>
      <StripeCheckout class="mt-4" />
    </div>
    <div v-else class="text-gray-500">{{ $t('noResult') }}</div>
  </div>
</template>
