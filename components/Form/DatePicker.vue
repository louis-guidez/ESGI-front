<script setup lang="ts">
import { useField } from 'vee-validate'
import type { DateValue } from 'reka-ui'

const props = defineProps<{
  type?: string
  name: string
  label: string
  modelValue?: Date
  required?: boolean
  unavailableBefore?: Date
  unavailableAfter?: Date
  unavailableDates?: Date[]
}>()

const { value, errorMessage }: { value: Ref<DateValue>; errorMessage: Ref<string | undefined> } = useField(() => props.name, {
  initialValue: props.modelValue ?? '',
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <UiDatePicker
      v-bind="$props"
      v-model="value"
      :error-message="errorMessage"
      class="w-full"
      :required="required"
      :unavailable-before="unavailableBefore"
      :unavailable-after="unavailableAfter"
      :unavailable-dates="unavailableDates"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
