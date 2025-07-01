<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'

import { cva, type VariantProps } from 'class-variance-authority'

const checkbox = cva('checkbox', {
  variants: {
    intent: {
      primary: 'border border-gray-400',
    },
    size: {
      sm: 'size-4 rounded text-xs',
      md: 'size-5 rounded text-sm',
      lg: 'size-6 rounded text-md',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-pointer',
    },
  },
})

const checkboxLabel = cva('checkboxLabel', {
  variants: {
    intent: {
      primary: '',
    },
    size: {
      sm: 'rounded text-xs',
      md: 'pl-1 rounded text-sm',
      lg: 'pl-2 rounded text-md',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
})

type CheckboxProps = VariantProps<typeof checkbox>

withDefaults(
  defineProps<{
    label: string
    modelValue: boolean
    intent?: CheckboxProps['intent']
    size?: CheckboxProps['size']
  }>(),
  {
    intent: 'primary',
    size: 'md',
    disabled: false,
  },
)

defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset class="p-2 flex flex-col gap-2">
    <label class="flex flex-row gap-2 items-center">
      <CheckboxRoot
        :model-value="modelValue"
        class="appearance-none items-center justify-center rounded-md shadow-sm border outline-none"
        :class="
          checkbox({
            intent,
            size,
            disabled: typeof $attrs['disabled'] !== 'undefined',
          })
        "
        @update:model-value="$emit('update:modelValue', $event)"
      >
        <CheckboxIndicator class="size-full rounded flex items-center justify-center">
          <Icon name="fluent:checkmark-12-filled" size="16" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <span
        class="select-none"
        :class="
          checkboxLabel({
            intent,
            size,
            disabled: typeof $attrs['disabled'] !== 'undefined',
          })
        "
        >{{ label }}</span
      >
    </label>
  </fieldset>
</template>
