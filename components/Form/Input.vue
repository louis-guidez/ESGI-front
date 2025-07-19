<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  id?: string
  type?: string
  name: string
  label: string
  modelValue?: string | { value: string; files: FileList }
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
    <UiInput v-bind="$props" v-model="value" :error-message="errorMessage" class="w-full" @update:model-value="$emit('update:modelValue', $event)" />
  </div>
</template>
