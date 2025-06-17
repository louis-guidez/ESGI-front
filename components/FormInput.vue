<template>
  <label class="block space-y-1">
    <span class="text-sm text-gray-700">{{ placeholder }}</span>
    <input
      :type="type"
      :placeholder="placeholder"
      class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
</script>

