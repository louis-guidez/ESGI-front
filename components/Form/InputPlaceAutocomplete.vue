<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputPlaceAutocompleteValue } from '../Ui/InputPlaceAutocomplete.vue'

const props = defineProps<{
  type?: string
  name: string
  label: string
}>()

const { value, errorMessage }: { value: Ref<InputPlaceAutocompleteValue['features'][0]>; errorMessage: Ref<string | undefined> } = useField(() => props.name)
</script>

<template>
  <UiInputPlaceAutocomplete v-bind="$props" v-model="value" :error-message="errorMessage" class="w-full" />
</template>
