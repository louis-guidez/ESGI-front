<script setup>
import { ref } from 'vue'

import AnnonceCard from '@/components/ui/AnnonceCard.vue'

const categories = ref([
  {
    categorie: 'Mobilier',
    annonces: [
      {
        id: 1,
        titre: 'Tonnelle',
        description: 'Tonnelle 3x3m en bon état',
        prix: 36,
        statut: 'disponible',
        dateCreation: '2025-07-15 14:00:00',
        photos: ['https://example.com/photos/tonnelle1.jpg'],
      },
      {
        id: 2,
        titre: 'Table en bois',
        description: 'Table rustique avec 6 chaises',
        prix: 120,
        statut: 'disponible',
        dateCreation: '2025-07-14 10:00:00',
        photos: ['https://example.com/photos/table1.jpg'],
      },
    ],
  },
  {
    categorie: 'Électroménager',
    annonces: [
      {
        id: 3,
        titre: 'Aspirateur Dyson',
        description: 'Dyson V8 avec accessoires',
        prix: 150,
        statut: 'disponible',
        dateCreation: '2025-07-13 09:00:00',
        photos: ['https://example.com/photos/dyson.jpg'],
      },
      {
        id: 4,
        titre: 'Machine à café Krups',
        description: 'Machine à café automatique',
        prix: 80,
        statut: 'disponible',
        dateCreation: '2025-07-10 15:00:00',
        photos: ['https://example.com/photos/cafe.jpg'],
      },
    ],
  },
  {
    categorie: 'Bricolage',
    annonces: [
      {
        id: 5,
        titre: 'Scie circulaire Makita',
        description: 'Scie en parfait état',
        prix: 90,
        statut: 'disponible',
        dateCreation: '2025-07-12 11:00:00',
        photos: ['https://example.com/photos/scie.jpg'],
      },
    ],
  },
]) // [{ categorie: "Mobilier", annonces: [...] }, ...]
const favorites = ref([])

function toggleFavorite(annonce) {
  const exists = favorites.value.find((a) => a.id === annonce.id)
  if (exists) {
    favorites.value = favorites.value.filter((a) => a.id !== annonce.id)
  } else {
    favorites.value.push(annonce)
  }
}

function isFavorite(annonce) {
  return favorites.value.some((a) => a.id === annonce.id)
}
</script>

<template>
  <div class="page">
    <!-- Favoris -->
    <section v-if="favorites.length">
      <h2>Vos offres sauvegardées</h2>
      <div class="card-list">
        <AnnonceCard v-for="annonce in favorites" :key="annonce.id" :annonce="annonce" :is-favorite="true" @toggle-favorite="toggleFavorite" />
      </div>
    </section>

    <!-- Affichage dynamique par catégorie -->
    <section v-for="cat in categories" :key="cat.categorie">
      <h2>
        {{ cat.categorie }} <span class="count">{{ cat.annonces.length }} offres</span>
      </h2>
      <div class="card-list">
        <AnnonceCard
          v-for="annonce in cat.annonces"
          :key="annonce.id"
          :annonce="annonce"
          :is-favorite="isFavorite(annonce)"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
  font-family: sans-serif;
}
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
h2 {
  margin-top: 25px;
  font-size: 1.2rem;
}
.count {
  font-weight: normal;
  font-size: 0.9rem;
  color: #666;
}
</style>
