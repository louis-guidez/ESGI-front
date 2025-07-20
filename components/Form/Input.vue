<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  id?: string
  type?: string
  name: string
  label: string
  modelValue?: string | { value: string; files: FileList }
  required?: boolean
  multiple?: boolean
}>()

const setInitialValue = (type: string) => {
  if (type === 'number') return 0
  if (type === 'file') return { value: '', files: [] }

  return ''
}

const { value, errorMessage }: { value: Ref<string | { value: string; files: FileList }>; errorMessage: Ref<string | undefined> } = useField(() => props.name, {
  initialValue: props.modelValue ?? setInitialValue(props.type ?? ''),
})

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
      :required="required"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
