<script setup lang="ts">
import type { Option, OptionGroup } from '~/components/Ui/Select.vue'
import { useField } from 'vee-validate'

const props = defineProps<{
  type?: string
  name: string
  label: string
  options: Option[] | OptionGroup[]
}>()

const { value, errorMessage }: { value: Ref<Option['value']>; errorMessage: Ref<string | undefined> } = useField(() => props.name)

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <UiSelect v-bind="$props" v-model="value" :error-message="errorMessage" class="w-full" @update:model-value="$emit('update:modelValue', $event)" />
  </div>
</template>
