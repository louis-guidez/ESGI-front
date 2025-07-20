<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  type?: string
  name: string
  label: string
  multiple?: boolean
}>()

const { value, errorMessage }: { value: Ref<string>; errorMessage: Ref<string | undefined> } = useField(() => props.name)

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <UiInput
      v-bind="$props"
      v-model="value"
      :multiple="props.multiple"
      :error-message="errorMessage"
      class="w-full"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
