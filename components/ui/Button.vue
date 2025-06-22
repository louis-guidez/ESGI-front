<template>
  <button
    :disabled="typeof $attrs['disabled'] !== 'undefined'"
    :class="
      button({
        intent,
        size,
        disabled: typeof $attrs['disabled'] !== 'undefined',
      })
    "
    class="size-fit flex items-center justify-center"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva('button', {
  variants: {
    intent: {
      primary: 'bg-green-500 hover:bg-green-600 text-white',
      secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
      ghost: 'bg-transparent text-gray-500 hover:text-gray-600',
      warning: 'bg-orange-500 hover:bg-orange-600 text-white',
      error: 'bg-red-500 hover:bg-red-600 text-white',
    },
    size: {
      small: 'px-2 py-1 rounded text-xs',
      medium: 'px-4 py-2 rounded text-sm',
      large: 'px-6 py-3 rounded text-md',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-pointer',
    },
  },
})

type ButtonProps = VariantProps<typeof button>

withDefaults(
  defineProps<{
    intent?: ButtonProps['intent']
    size?: ButtonProps['size']
  }>(),
  {
    intent: 'primary',
    size: 'medium',
    disabled: false,
  },
)
</script>
