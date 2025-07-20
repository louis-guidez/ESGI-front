<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

// const { t } = useI18n()

const form = ref({
  startDate: undefined,
  endDate: undefined,
})

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    startDate: yup.mixed(),
    endDate: yup.mixed(),
  }),
})

const onSubmit = handleSubmit(() => {
  return console.log(form.value)
})
</script>

<template>
  <div class="p-12 flex flex-col gap-4 items-center">
    <h1>Paiement</h1>

    <form class="w-full flex flex-col gap-4" @submit="onSubmit">
      <div class="w-full flex gap-4">
        <FormDatePicker v-model="form.startDate" name="startDate" :label="$t('startDate')" :required="true" class="w-full" />
        <FormDatePicker v-model="form.endDate" name="endDate" :label="$t('endDate')" :required="true" class="w-full" />
      </div>

      <UiButton type="submit" class="w-full font-bold">
        <span>{{ $t('save') }}</span>
      </UiButton>
    </form>
  </div>
</template>
