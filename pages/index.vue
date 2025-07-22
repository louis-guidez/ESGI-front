<script setup>
defineOgImageComponent('Lendo', {
  headline: '🛒',
  title: 'Lendo',
  description: 'Lendo',
  theme: 'green',
  colorMode: 'dark',
})

const { annonces, groupedByCategory, fetchAnnonces } = extractStore(useAnnonceStore())
const { fetchCategories, getAllCategories } = useCategorieStore()

const categories = ref([])

onMounted(async () => {
  const response = await fetchAnnonces()
  annonces.value = response

  await fetchCategories()

  categories.value = getAllCategories()
})

console.log('📦 Annonces initialisées', groupedByCategory)

//  console.log('Annonces chargées :', annonces.value)

// const categories = ref([
//   {
//     categorie: 'Mobilier',
//     annonces: [
//       {
//         id: 1,
//         titre: 'Tonnelle',
//         description: 'Tonnelle 3x3m en bon état',
//         prix: 36,
//         statut: 'disponible',
//         dateCreation: '2025-07-15 14:00:00',
//         photos: ['https://example.com/photos/tonnelle1.jpg'],
//       },
//       {
//         id: 2,
//         titre: 'Table en bois',
//         description: 'Table rustique avec 6 chaises',
//         prix: 120,
//         statut: 'disponible',
//         dateCreation: '2025-07-14 10:00:00',
//         photos: ['https://example.com/photos/table1.jpg'],
//       },
//     ],
//   },
//   {
//     categorie: 'Électroménager',
//     annonces: [
//       {
//         id: 3,
//         titre: 'Aspirateur Dyson',
//         description: 'Dyson V8 avec accessoires',
//         prix: 150,
//         statut: 'disponible',
//         dateCreation: '2025-07-13 09:00:00',
//         photos: ['https://example.com/photos/dyson.jpg'],
//       },
//       {
//         id: 4,
//         titre: 'Machine à café Krups',
//         description: 'Machine à café automatique',
//         prix: 80,
//         statut: 'disponible',
//         dateCreation: '2025-07-10 15:00:00',
//         photos: ['https://example.com/photos/cafe.jpg'],
//       },
//     ],
//   },
//   {
//     categorie: 'Bricolage',
//     annonces: [
//       {
//         id: 5,
//         titre: 'Scie circulaire Makita',
//         description: 'Scie en parfait état',
//         prix: 90,
//         statut: 'disponible',
//         dateCreation: '2025-07-12 11:00:00',
//         photos: ['https://example.com/photos/scie.jpg'],
//       },
//     ],
//   },
// ])

const favorites = useCookie('favorites', { default: () => [] })

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
  <div class="p-12 flex flex-col gap-12">
    <section v-if="favorites.length" class="flex flex-col gap-4">
      <div class="inline-flex gap-2 items-end">
        <h2 class="text-2xl font-semibold">Vos offres sauvegardées</h2>
        <NuxtLink class="text-sm hover:text-green-500 p-0.5" to="/favorites">
          <span>{{ favorites.length }} offres <Icon name="material-symbols:arrow-right-alt-rounded" /></span>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(400px,0fr))] gap-4">
        <UiAnnonceCard v-for="annonce in favorites" :key="annonce.id" :annonce="annonce" :is-favorite="true" @toggle-favorite="toggleFavorite" />
      </div>
    </section>

    <section v-if="annonces.length" class="flex flex-col gap-4">
      <div class="inline-flex gap-2 items-end">
        <h2 class="text-2xl font-semibold">Toutes les annonces</h2>
        <NuxtLink class="text-sm hover:text-green-500 p-0.5" to="/annonce/list">
          <span>{{ annonces.length }} offres <Icon name="material-symbols:arrow-right-alt-rounded" /></span>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(400px,0fr))] gap-4">
        <UiAnnonceCard
          v-for="annonce in annonces.slice(0, 10)"
          :key="annonce.id"
          :annonce="annonce"
          :is-favorite="isFavorite(annonce)"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </section>

    <section v-for="category in categories" :key="category.id" class="flex flex-col gap-4">
      <div class="inline-flex gap-2 items-end">
        <h2 class="text-2xl font-semibold">{{ category.label }}</h2>
        <NuxtLink class="text-sm hover:text-green-500 p-0.5" to="/annonce/list">
          <span
            >{{ annonces.filter((a) => a.categories.some((c) => c === category.label)).slice(0, 10).length }} offres
            <Icon name="material-symbols:arrow-right-alt-rounded"
          /></span>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(400px,0fr))] gap-4">
        <UiAnnonceCard
          v-for="annonce in annonces.filter((a) => a.categories.some((c) => c === category.label)).slice(0, 10)"
          :key="annonce.id"
          :annonce="annonce"
          :is-favorite="isFavorite(annonce)"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </section>
  </div>
</template>
