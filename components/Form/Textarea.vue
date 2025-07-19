<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  type?: string
  name: string
  label: string
  modelValue?: string
  required?: boolean
}>()

const { value, errorMessage }: { value: Ref<string>; errorMessage: Ref<string | undefined> } = useField(() => props.name, {
  initialValue: '',
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <UiTextarea
      v-bind="$props"
      v-model="value"
      :error-message="errorMessage"
      class="w-full"
      :required="required"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
