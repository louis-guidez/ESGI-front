<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  type?: string
  name: string
  label: string
}>()

const { value, errorMessage }: { value: Ref<string>; errorMessage: Ref<string | undefined> } = useField(() => props.name)
</script>

<template>
  <div>
    <UiInput v-bind="$props" v-model="value" :error-message="errorMessage" class="w-full" />
  </div>
</template>
