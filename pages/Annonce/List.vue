<script setup>
defineOgImageComponent('Lendo', {
  headline: '🛒',
  title: 'Lendo',
  description: 'Lendo',
  theme: 'green',
  colorMode: 'dark',
})

const { search, fetchAnnonces } = extractStore(useAnnonceStore())

const { fetchCategories, getAllCategories } = useCategorieStore()

const categoryOptions = computed(() =>
  getAllCategories().map((cat) => ({
    label: cat.label,
    value: cat.id,
  })),
)

const { data } = useAsyncData('annonces-list', () => fetchAnnonces(search.value), { watch: [search] })
const filteredData = computed(() => {
  if (!data.value || !categoryOptions.value) return []
  const selectedCategoriesOptions = categoryOptions.value.filter((c) => selectedCategories.value.includes(c.value))

  return data.value.filter((annonce) => annonce.categories.some((cat) => selectedCategoriesOptions.some((c) => c.label === cat)))
})

const selectedCategories = ref([])

watch(categoryOptions, async () => {
  selectedCategories.value = categoryOptions.value.map((option) => option.value)
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

const searchValue = ref('')

const handleSearch = () => {
  search.value = searchValue.value.trim()
}

onMounted(() => {
  if (search.value) {
    searchValue.value = search.value
  }
})

onMounted(async () => {
  await fetchCategories()
})
</script>

<template>
  <div class="p-12 flex gap-12">
    <div class="lg:w-2/3 flex flex-col gap-8">
      <h1 class="text-4xl font-bold">Toutes les annonces</h1>

      <section v-if="filteredData?.length" class="flex flex-col gap-24">
        <div class="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-12">
          <UiAnnonceCard
            v-for="annonce in filteredData"
            :key="annonce.id"
            :annonce="annonce"
            :is-favorite="isFavorite(annonce)"
            @toggle-favorite="toggleFavorite"
          />
        </div>
      </section>
      <div v-else class="size-full flex flex-col justify-center items-center">
        <Icon name="fluent:list-16-regular" size="48" />
        <span class="text-2xl font-semibold">{{ $t('noAnnonce') }}</span>
      </div>
    </div>

    <div class="sticky top-[5.5rem] p-8 hidden h-screen lg:flex flex-col gap-8 w-1/3 bg-white overflow-hidden rounded-2xl">
      <h2 class="text-2xl font-semibold">Filtres</h2>

      <div class="size-full flex flex-col gap-4">
        <form class="w-full py-1 inline-flex gap-2 items-center justify-center" @submit.prevent="handleSearch">
          <UiInput ref="searchRef" v-model="searchValue" size="lg" type="search" :placeholder="$t('search')" class="w-full" />
          <UiButton class="h-full aspect-square" size="sm" type="submit">
            <Icon :size="18" name="fluent:search-12-filled" />
          </UiButton>
        </form>

        <UiSelect v-model="selectedCategories" size="lg" name="categories" multiple :options="categoryOptions" :label="$t('categories')" />
      </div>
    </div>
  </div>
</template>
