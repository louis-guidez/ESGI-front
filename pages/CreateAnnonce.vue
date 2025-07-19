<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const form = ref({
  title: '',
  description: '',
  price: '',
  pictures: {
    value: '',
    files: null,
  },
})

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    pictures: yup.object({ value: yup.string(), files: yup.mixed().required('Files is required') }).required('Files is required'),
  }),
})

const onSubmit = handleSubmit(() => {
  console.log(form.value, 'TODO: handle form submission')
})
</script>

<template>
  <div class="p-18 w-full flex flex-col items-center">
    <div class="max-w-2xl w-full">
      <h1 class="text-2xl font-semibold">{{ $t('createAnAd') }}</h1>

      <form class="my-8 flex flex-col gap-4" @submit.prevent="onSubmit">
        <FormInput v-model="form.title" name="title" type="text" :label="$t('adTitle')" :required="true" />

        <FormTextarea v-model="form.description" name="description" :label="$t('adDescription')" :required="true" />

        <!-- TODO add categories -->
        <!-- <FormSelect v-model="form.categories" name="categories" :label="$t('adCategories')" :options="[]" /> -->

        <FormInput v-model="form.price" name="price" type="number" min="0" :label="$t('adPrice')" :required="true" />

        <FormInput v-model="form.pictures" name="pictures" type="file" multiple :label="$t('adPictures')" :required="true" />

        <UiButton type="submit" class="w-full">{{ $t('createAnAd') }}</UiButton>
      </form>
    </div>
  </div>
</template>
