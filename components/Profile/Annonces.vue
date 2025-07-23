<script setup lang="ts">
// const { locales, setLocale } = useI18n()

// const { getAnnoncesByUser } = useAnnonceStore()

const { user } = extractStore(useUserStore())

const userId = user.value?.id

// onMounted(async () => {
//   const mesAnnonces = await getAnnoncesByUser()
//   console.log('📦 Mes annonces :', mesAnnonces)
// })

const { groupedByCategory, fetchAnnonces } = useAnnonceStore()

onMounted(async () => {
  await fetchAnnonces()
})

console.log('📦 Annonces initialisées', groupedByCategory.value)
</script>

<template>
  <div class="flex flex-col gap-4">user: {{ userId }}</div>
</template>
