<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import { cva, type VariantProps } from 'class-variance-authority'

const input = cva('input', {
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
  },
})

type InputProps = VariantProps<typeof input>

withDefaults(
  defineProps<{
    id?: string
    type?: string
    label?: string
    modelValue: string
    intent?: InputProps['intent']
    size?: InputProps['size']
    errorMessage?: string
  }>(),
  {
    id: '',
    label: undefined,
    type: 'text',
    intent: 'primary',
    size: 'md',
    disabled: false,
    errorMessage: '',
  },
)

const inputRef = shallowRef()
const { focused } = useFocus(inputRef)

defineEmits(['update:modelValue'])
defineExpose({ focused })
</script>

<template>
  <fieldset class="flex flex-col gap-2">
    <label v-if="label" :for="id" class="text-sm font-semibold">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      ref="inputRef"
      :type="type"
      :disabled="typeof $attrs['disabled'] !== 'undefined'"
      :class="
        input({
          intent,
          size,
          disabled: typeof $attrs['disabled'] !== 'undefined',
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
