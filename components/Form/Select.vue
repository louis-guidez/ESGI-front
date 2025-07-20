<script setup lang="ts">
import type { Option, OptionGroup } from '~/components/Ui/Select.vue'
import { useField } from 'vee-validate'

const props = defineProps<{
  id?: string
  type?: string
  name: string
  label: string
  options: Option[] | OptionGroup[]
  modelValue?: Option['value']
}>()

const { value, errorMessage }: { value: Ref<Option['value']>; errorMessage: Ref<string | undefined> } = useField(() => props.name, {
  initialValue: props.modelValue,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <UiSelect :id="id" v-bind="$props" v-model="value" :error-message="errorMessage" class="w-full" @update:model-value="$emit('update:modelValue', $event)" />
  </div>
</template>
