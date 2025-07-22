<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAnnonceStore } from '@/stores/annonces'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: ['auth'],
})

const router = useRouter()
const { createAnnonce } = useAnnonceStore()
const { fetchCategories, getAllCategories, getById } = useCategorieStore()

onMounted(async () => {
  await fetchCategories()

  const toutes = getAllCategories()
  console.log('📋 Toutes les catégories :', toutes)

  const unique = getById(1)
  console.log('🔎 Catégorie 1 :', unique)
})

const categoryOptions = computed(() =>
  getAllCategories().map((cat) => ({
    label: cat.label,
    value: cat.id,
  })),
)

const form = ref({
  title: '',
  description: '',
  price: '',
  categories: [] as number[],
  pictures: {
    value: '',
    files: null as FileList | null,
  },
})

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    categories: yup.array().min(1, 'Sélectionner au moins une catégorie'),
    pictures: yup
      .object({
        value: yup.string(),
        files: yup.mixed().required('Files is required'),
      })
      .required(),
  }),
})

const onSubmit = handleSubmit(async () => {
  try {
    const formData = new FormData()
    formData.append('titre', form.value.title)
    formData.append('description', form.value.description)
    formData.append('prix', form.value.price)
    formData.append('statut', 'disponible')
    formData.append('dateCreation', new Date().toISOString())

    const files = form.value.pictures.files
    if (files) {
      Array.from(files).forEach((file, i) => {
        formData.append(`photos[${i}]`, file)
      })
    }

    form.value.categories.forEach((id, index) => {
      formData.append(`categorieIds[${index}]`, id.toString())
    })

    const response = await createAnnonce(formData)
    if (response) {
      router.push('/')
    }
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="p-18 w-full flex flex-col items-center">
    <div class="max-w-2xl w-full">
      <h1 class="text-2xl font-semibold">{{ $t('createAnAd') }}</h1>

      <form class="my-8 flex flex-col gap-4" @submit.prevent="onSubmit">
        <FormInput v-model="form.title" name="title" type="text" :label="$t('adTitle')" />

        <FormTextarea v-model="form.description" name="description" :label="$t('adDescription')" />

        <FormInput v-model="form.price" name="price" type="number" min="0" :label="$t('adPrice')" />

        <FormInput v-model="form.pictures" name="pictures" type="file" multiple :label="$t('adPictures')" />

        <UiSelect v-model="form.categories" name="categories" multiple :options="categoryOptions" :label="$t('categories')" />

        <UiButton type="submit" class="w-full">{{ $t('createAnAd') }}</UiButton>
      </form>
    </div>
  </div>
</template>
