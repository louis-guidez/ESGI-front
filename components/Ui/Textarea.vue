<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

const textarea = cva('textarea', {
  variants: {
    intent: {
      primary: 'border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
    },
    size: {
      sm: 'h-16 px-2 py-1 rounded text-xs',
      md: 'h-32 px-4 py-2 rounded text-sm',
      lg: 'h-64 px-6 py-3 rounded text-md',
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
    modelValue?: string
    errorMessage?: string
    intent?: TextareaProps['intent']
    size?: TextareaProps['size']
    resize?: TextareaProps['resize']
    required?: boolean
  }>(),
  {
    id: undefined,
    type: 'text',
    errorMessage: '',
    modelValue: '',
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
    <span v-if="label || required" class="flex items-center gap-1">
      <label :for="id" class="text-sm font-semibold">{{ label }}</label>
      <span v-if="required" class="text-red-500">*</span>
    </span>
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
    <slot v-if="errorMessage" name="error" v-bind="{ errorMessage }">
      <span class="text-red-500">{{ $te(errorMessage) ? $t(errorMessage) : errorMessage }}</span>
    </slot>
  </fieldset>
</template>
