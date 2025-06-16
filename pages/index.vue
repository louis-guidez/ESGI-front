<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <section class="mt-8 w-full" v-if="savedOffers.length">
      <h2 class="text-2xl font-semibold mb-4 px-4">Vos offres sauvegardées</h2>
      <HorizontalScroller>
        <div v-for="offer in savedOffers" :key="offer.id" class="bg-white rounded shadow w-40 flex-shrink-0">
          <img :src="offer.image" class="h-24 w-full object-cover rounded-t" />
          <div class="p-2">
            <h3 class="font-medium text-sm truncate">{{ offer.title }}</h3>
            <p class="text-xs text-gray-500">{{ offer.price }}</p>
          </div>
        </div>
      </HorizontalScroller>
    </section>

    <section class="mt-8 w-full" v-if="furnitureOffers.length">
      <h2 class="text-2xl font-semibold mb-4 px-4">Mobilier</h2>
      <HorizontalScroller>
        <div v-for="item in furnitureOffers" :key="item.id" class="bg-white rounded shadow w-40 flex-shrink-0">
          <img :src="item.image" class="h-24 w-full object-cover rounded-t" />
          <div class="p-2">
            <h3 class="font-medium text-sm truncate">{{ item.title }}</h3>
            <p class="text-xs text-gray-500">{{ item.price }}</p>
          </div>
        </div>
      </HorizontalScroller>
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
import HorizontalScroller from '@/components/HorizontalScroller.vue'

const savedOffers = ref([
  { id: 1, title: 'Chaise scandinave', price: '30€', image: 'https://picsum.photos/200/150?random=1' },
  { id: 2, title: 'Lampe vintage', price: '20€', image: 'https://picsum.photos/200/150?random=2' },
  { id: 3, title: 'Table basse', price: '45€', image: 'https://picsum.photos/200/150?random=3' },
])

const furnitureOffers = ref([
  { id: 1, title: 'Table en bois massif', price: '250€', image: 'https://picsum.photos/200/150?random=1' },
  { id: 2, title: 'Chaise scandinave', price: '45€', image: 'https://picsum.photos/200/150?random=2' },
  { id: 3, title: 'Commode vintage', price: '80€', image: 'https://picsum.photos/200/150?random=3' },
  { id: 4, title: 'Canapé 3 places', price: '120€', image: 'https://picsum.photos/200/150?random=4' },
  { id: 5, title: 'Buffet en chêne', price: '90€', image: 'https://picsum.photos/200/150?random=5' },
  { id: 6, title: 'Fauteuil design', price: '60€', image: 'https://picsum.photos/200/150?random=6' },
  { id: 7, title: 'Meuble TV moderne', price: '110€', image: 'https://picsum.photos/200/150?random=7' },
  { id: 8, title: 'Lit double 160x200', price: '320€', image: 'https://picsum.photos/200/150?random=8' },
  { id: 9, title: 'Table basse en verre', price: '75€', image: 'https://picsum.photos/200/150?random=9' },
  { id: 10, title: 'Armoire 3 portes', price: '220€', image: 'https://picsum.photos/200/150?random=10' },
  { id: 11, title: 'Chaise de bureau ergonomique', price: '85€', image: 'https://picsum.photos/200/150?random=11' },
  { id: 12, title: 'Table à manger extensible', price: '180€', image: 'https://picsum.photos/200/150?random=12' },
  { id: 13, title: 'Étagère industrielle', price: '65€', image: 'https://picsum.photos/200/150?random=13' },
  { id: 14, title: 'Meuble d’entrée moderne', price: '50€', image: 'https://picsum.photos/200/150?random=14' },
  { id: 15, title: 'Bibliothèque murale', price: '150€', image: 'https://picsum.photos/200/150?random=15' },
  { id: 16, title: 'Tabouret de bar', price: '30€', image: 'https://picsum.photos/200/150?random=16' },
  { id: 17, title: 'Buffet bas contemporain', price: '95€', image: 'https://picsum.photos/200/150?random=17' },
  { id: 18, title: 'Lit superposé enfant', price: '270€', image: 'https://picsum.photos/200/150?random=18' },
  { id: 19, title: 'Table de chevet', price: '40€', image: 'https://picsum.photos/200/150?random=19' },
  { id: 20, title: 'Meuble à chaussures', price: '55€', image: 'https://picsum.photos/200/150?random=20' },
  { id: 21, title: 'Bureau en bois clair', price: '140€', image: 'https://picsum.photos/200/150?random=21' },
  { id: 22, title: 'Penderie minimaliste', price: '130€', image: 'https://picsum.photos/200/150?random=22' },
  { id: 23, title: 'Table console extensible', price: '100€', image: 'https://picsum.photos/200/150?random=23' },
  { id: 24, title: 'Meuble sous-vasque salle de bain', price: '75€', image: 'https://picsum.photos/200/150?random=24' },
  { id: 25, title: 'Table ronde en verre', price: '115€', image: 'https://picsum.photos/200/150?random=25' },
])

const categories = ref([
  { name: 'Outils', color: 'bg-blue-600', icon: '🛠️' },
  { name: 'Sport', color: 'bg-green-600', icon: '⚽' },
  { name: 'Électronique', color: 'bg-yellow-500', icon: '💻' },
  { name: 'Jeux', color: 'bg-red-500', icon: '🎲' },
])
</script>
