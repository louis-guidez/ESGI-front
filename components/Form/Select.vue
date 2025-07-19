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
</script>

<template>
  <UiSelect v-bind="$props" v-model="value" :error-message="errorMessage" class="w-full" />
</template>
