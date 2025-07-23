<script setup>
defineOgImageComponent('Lendo', {
  headline: '🛒',
  title: 'Lendo',
  description: 'Lendo',
  theme: 'green',
  colorMode: 'dark',
})

const { annonces, fetchAnnonces } = extractStore(useAnnonceStore())
const { fetchCategories, getAllCategories } = useCategorieStore()

const categories = ref([])

onMounted(async () => {
  const response = await fetchAnnonces()
  annonces.value = response

  await fetchCategories()

  categories.value = getAllCategories()
})

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
