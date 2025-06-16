<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <section class="mt-8 pb-8 w-full">
      <h2 class="text-2xl font-semibold mb-4 px-4">Annonces</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        <div
          v-for="annonce in annonces"
          :key="annonce.id"
          class="bg-white rounded shadow"
        >
          <img :src="annonce.image" class="h-24 w-full object-cover rounded-t" />
          <div class="p-2">
            <h3 class="font-medium text-sm truncate">{{ annonce.title }}</h3>
            <p class="text-xs text-gray-500">{{ annonce.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-8 pb-20 w-full">
      <h2 class="text-2xl font-semibold mb-4">Découvrir</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="cat in categories" :key="cat.name" :class="[cat.color, 'rounded p-4 flex items-center text-white space-x-2']">
          <span class="text-2xl">{{ cat.icon }}</span>
          <span class="font-medium">{{ cat.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { data: annonces } = await useAsyncData('annonces', () =>
  $fetch('http://localhost:8000/api/annonces')
)

const categories = ref([
  { name: 'Outils', color: 'bg-blue-600', icon: '🛠️' },
  { name: 'Sport', color: 'bg-green-600', icon: '⚽' },
  { name: 'Électronique', color: 'bg-yellow-500', icon: '💻' },
  { name: 'Jeux', color: 'bg-red-500', icon: '🎲' },
])
</script>
