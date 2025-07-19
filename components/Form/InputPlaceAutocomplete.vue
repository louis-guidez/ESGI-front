<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputPlaceAutocompleteValue } from '../Ui/InputPlaceAutocomplete.vue'

const props = defineProps<{
  id?: string
  type?: string
  name: string
  label: string
  modelValue?: InputPlaceAutocompleteValue['features'][0]
}>()

const { value, errorMessage }: { value: Ref<InputPlaceAutocompleteValue['features'][0]>; errorMessage: Ref<string | undefined> } = useField(() => props.name)

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  if (props.modelValue) {
    value.value = props.modelValue
  }
})
</script>

<template>
  <div>
    <UiInputPlaceAutocomplete
      v-bind="$props"
      :id="props.id"
      v-model="value"
      :error-message="errorMessage"
      class="w-full"
      @update:model-value="(place: InputPlaceAutocompleteValue['features'][0]) => emit('update:modelValue', place)"
    />
  </div>
</template>
