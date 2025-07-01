<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva('button', {
  variants: {
    intent: {
      primary: 'bg-green-500 hover:bg-green-600 text-white',
      secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
      ghost: 'bg-transparent text-gray-560 hover:bg-gray-300',
      warning: 'bg-orange-500 hover:bg-orange-600 text-white',
      error: 'bg-red-500 hover:bg-red-600 text-white',
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
    size: 'md',
    disabled: false,
  },
)
</script>

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
