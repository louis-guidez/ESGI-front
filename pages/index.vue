<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '@/composables/useApi'

import AnnonceCard from '@/components/Ui/AnnonceCard.vue'

defineOgImageComponent('Lendo', {
  headline: '🛒',
  title: 'Lendo',
  description: 'Lendo',
  theme: 'green',
  colorMode: 'dark',
})

const annonces = ref([])
const favorites = ref([])

async function fetchAnnonces() {
  try {
    const res = await apiFetch('/annonces')
    annonces.value = res
  } catch (err) {
    console.error('Erreur chargement annonces:', err)
  }
}

onMounted(fetchAnnonces)

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
    <section v-if="annonces.length">
      <h2>
        Toutes les annonces <span class="count">{{ annonces.length }} offres</span>
      </h2>
      <div class="card-list">
        <AnnonceCard
          v-for="annonce in annonces"
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
