<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

const badge = cva('badge', {
  variants: {
    intent: {
      primary: 'bg-green-300 text-green-800',
      secondary: 'bg-gray-300 text-gray-800',
    },
    size: {
      sm: 'px-2 py-1 rounded-3xl text-xs font-semibold',
      md: 'px-4 py-2 rounded-3xl text-sm font-semibold',
      lg: 'px-6 py-3 rounded-3xl text-md font-semibold',
    },
  },
})

type BadgeProps = VariantProps<typeof badge>

withDefaults(
  defineProps<{
    intent?: BadgeProps['intent']
    size?: BadgeProps['size']
  }>(),
  {
    intent: 'primary',
    size: 'md',
    disabled: false,
  },
)
</script>

<template>
  <span
    :disabled="typeof $attrs['disabled'] !== 'undefined'"
    :class="
      badge({
        intent,
        size,
      })
    "
    class="size-fit flex items-center justify-center"
  >
    <slot />
  </span>
</template>
