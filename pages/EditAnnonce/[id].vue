<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

definePageMeta({
  middleware: ['auth', 'annonce-owner'],
})

const route = useRoute()

const id = computed(() => route.params.id)

const { getAnnonce, updateAnnonce } = extractStore(useAnnonceStore())
const { fetchCategories, getAllCategories } = extractStore(useCategorieStore())

const annonce = ref<Annonce | null>(null)

const categoryOptions = computed(() =>
  getAllCategories().map((cat) => ({
    label: cat.label,
    value: cat.id,
  })),
)

const form = ref({
  title: '',
  description: '',
  price: '0',
  categories: [] as number[],
  pictures: {
    value: '',
    files: null as FileList | null,
  },
})

const { handleSubmit, setValues } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    categories: yup.array().required().min(1, 'Sélectionner au moins une catégorie'),
    // pictures: yup
    //   .object({
    //     value: yup.string(),
    //     files: yup.mixed().required('Files is required'),
    //   })
    //   .required(),
  }),
})

const onSubmit = handleSubmit(async () => {
  try {
    const newFormData: Partial<Annonce> = {
      titre: form.value.title,
      description: form.value.description,
      prix: form.value.price,
      statut: 'disponible',
      categories: [],
    }

    form.value.categories.forEach((id) => {
      const cat = categoryOptions.value.find((option) => option.value === id)
      if (cat) newFormData.categories?.push(cat.label)
    })

    const response = await updateAnnonce(Number(id.value), newFormData)

    return response
  } catch (e) {
    console.error(e)
  }
})

onMounted(async () => {
  await fetchCategories()

  try {
    const response = await getAnnonce(Number(id.value))
    if (!response) return
    annonce.value = response
    if (!annonce.value) return

    form.value.title = annonce.value.titre
    form.value.description = annonce.value.description
    form.value.price = annonce.value.prix.toString()

    form.value.categories = annonce.value.categories
      .map((cat) => categoryOptions.value.find((option) => option.label === cat)?.value || undefined)
      .filter((cat) => cat !== undefined)

    // TODO Pictures
    // console.log(annonce.value.photos)
    // form.value.pictures.value = annonce.value.photos

    setValues(form.value)
  } catch (err) {
    console.error('Erreur chargement annonce:', err)
  }
})

watch(
  form,
  (newValue) => {
    setValues(newValue)
  },
  { deep: true },
)
</script>

<template>
  <div class="p-18 w-full flex flex-col items-center">
    <div class="max-w-2xl w-full">
      <h1 class="text-2xl font-semibold">{{ $t('editAnnonce') }}</h1>

      <form class="my-8 flex flex-col gap-4" @submit.prevent="onSubmit">
        <FormInput v-model="form.title" name="title" type="text" :label="$t('adTitle')" :required="true" />

        <FormTextarea v-model="form.description" name="description" :label="$t('adDescription')" :required="true" />

        <FormInput v-model="form.price" name="price" type="number" min="0" :label="$t('adPrice')" :required="true" />

        <!-- <FormInput v-model="form.pictures" name="pictures" type="file" multiple :label="$t('adPictures')" /> -->

        <UiSelect v-model="form.categories" name="categories" multiple :options="categoryOptions" :label="$t('categories')" :required="true" />

        <UiButton type="submit" class="w-full">{{ $t('editAnnonce') }}</UiButton>
      </form>
    </div>
  </div>
</template>
