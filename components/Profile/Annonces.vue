<script setup lang="ts">
// const { locales, setLocale } = useI18n()

const { annonces, getAnnoncesByUser, deleteAnnonce, groupedByCategory } = extractStore(useAnnonceStore())

onMounted(async () => {
  await getAnnoncesByUser()
})

async function handleDelete(annonceToDelete) {
  await deleteAnnonce(annonceToDelete.id)
  await getAnnoncesByUser()
}

console.log('📦 Annonces initialisées', groupedByCategory.value)
</script>

<template>
  <div class="w-full space-y-4">
    <h2 class="text-xl font-semibold mb-4">Mes Annonces</h2>

    <div v-if="annonces.length === 0" class="text-gray-500">Aucune annonce trouvée.</div>

    <div v-else class="space-y-6">
      <ProfileAnnonceCard v-for="annonce in annonces" :key="annonce.id" :annonce="annonce" @delete="handleDelete" />
    </div>
  </div>
</template>
