<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

const textarea = cva('textarea', {
  variants: {
    intent: {
      primary: 'border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
    },
    size: {
      sm: 'px-2 py-1 rounded text-xs',
      md: 'px-4 py-2 rounded text-sm',
      lg: 'px-6 py-3 rounded text-md',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-pointer',
    },
    resize: {
      true: 'resize-y',
      false: 'resize-none',
    },
  },
})

type TextareaProps = VariantProps<typeof textarea>

withDefaults(
  defineProps<{
    id?: string
    type?: string
    label: string
    modelValue: string
    intent?: TextareaProps['intent']
    size?: TextareaProps['size']
    resize?: TextareaProps['resize']
  }>(),
  {
    intent: 'primary',
    size: 'md',
    disabled: false,
    resize: false,
  },
)

defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset class="flex flex-col gap-2">
    <label :for="id" class="text-sm font-semibold">{{ label }}</label>
    <textarea
      v-bind="$attrs"
      :id="id"
      :type="type"
      :disabled="typeof $attrs['disabled'] !== 'undefined'"
      :class="
        textarea({
          intent,
          size,
          disabled: typeof $attrs['disabled'] !== 'undefined',
          resize,
        })
      "
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    />
  </fieldset>
</template>
