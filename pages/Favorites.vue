<script setup>
defineOgImageComponent('Lendo', {
  headline: '🛒',
  title: 'Lendo',
  description: 'Lendo',
  theme: 'green',
  colorMode: 'dark',
})

onMounted(async () => {
  await fetchAnnonces()
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
</script>

<template>
  <div class="p-12 flex flex-col gap-12">
    <section v-if="favorites.length" class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold">Vos offres sauvegardées</h2>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,0fr))] gap-4">
        <UiAnnonceCard v-for="annonce in favorites" :key="annonce.id" :annonce="annonce" :is-favorite="true" @toggle-favorite="toggleFavorite" />
      </div>
    </section>
  </div>
</template>
