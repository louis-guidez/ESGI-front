<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <section class="px-4 mt-8" v-if="savedOffers.length">
      <h2 class="text-2xl font-semibold mb-4">Vos offres sauvegardées</h2>
      <div class="flex space-x-4 overflow-x-auto pb-4">
        <div v-for="offer in savedOffers" :key="offer.id" class="bg-white rounded shadow w-40 flex-shrink-0">
          <img :src="offer.image" class="h-24 w-full object-cover rounded-t" />
          <div class="p-2">
            <h3 class="font-medium text-sm truncate">{{ offer.title }}</h3>
            <p class="text-xs text-gray-500">{{ offer.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 mt-8" v-if="furnitureOffers.length">
      <h2 class="text-2xl font-semibold mb-4">Mobilier</h2>
      <div class="flex space-x-4 overflow-x-auto pb-4">
        <div v-for="item in furnitureOffers" :key="item.id" class="bg-white rounded shadow w-40 flex-shrink-0">
          <img :src="item.image" class="h-24 w-full object-cover rounded-t" />
          <div class="p-2">
            <h3 class="font-medium text-sm truncate">{{ item.title }}</h3>
            <p class="text-xs text-gray-500">{{ item.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 mt-8 pb-20">
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

const savedOffers = ref([
  { id: 1, title: 'Chaise scandinave', price: '30€', image: 'https://picsum.photos/200/150?random=1' },
  { id: 2, title: 'Lampe vintage', price: '20€', image: 'https://picsum.photos/200/150?random=2' },
  { id: 3, title: 'Table basse', price: '45€', image: 'https://picsum.photos/200/150?random=3' },
])

const furnitureOffers = ref([
  { id: 4, title: 'Canapé 3 places', price: '120€', image: 'https://picsum.photos/200/150?random=4' },
  { id: 5, title: 'Buffet en chêne', price: '90€', image: 'https://picsum.photos/200/150?random=5' },
  { id: 6, title: 'Fauteuil design', price: '60€', image: 'https://picsum.photos/200/150?random=6' },
])

const categories = ref([
  { name: 'Outils', color: 'bg-blue-600', icon: '🛠️' },
  { name: 'Sport', color: 'bg-green-600', icon: '⚽' },
  { name: 'Électronique', color: 'bg-yellow-500', icon: '💻' },
  { name: 'Jeux', color: 'bg-red-500', icon: '🎲' },
])
</script>
