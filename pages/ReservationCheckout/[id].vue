<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue-sonner'

const { reserveAnnonce } = extractStore(useAnnonceStore())
const { user } = extractStore(useUserStore())

// const { t } = useI18n()

const route = useRoute()
const id = computed(() => route.params.id)

const form = ref({
  startDate: undefined,
  endDate: undefined,
})

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    startDate: yup.mixed().required(),
    endDate: yup.mixed().required(),
  }),
})

const onSubmit = handleSubmit(async () => {
  if (!form.value.startDate || !form.value.endDate || !user.value) {
    toast.error('Non authentifié')
    return
  }

  const res = await reserveAnnonce({
    startDate: new Date((form.value.startDate as DateValue).toString()).toISOString(),
    endDate: new Date((form.value.endDate as DateValue).toString()).toISOString(),
    annonceId: Number(id.value),
    userId: user.value.id,
  })
  console.log('res', res)
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
