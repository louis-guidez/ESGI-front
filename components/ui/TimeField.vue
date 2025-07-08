<script setup lang="ts">
import { Label, TimeFieldInput, TimeFieldRoot, type TimeFieldRootProps } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'

const { locale } = useI18n()

const timefield = cva('timefield', {
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

type TextareaProps = VariantProps<typeof timefield>

withDefaults(
  defineProps<{
    id?: string
    type?: string
    label: string
    modelValue: TimeFieldRootProps['modelValue'] | null
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
    <Label class="text-sm font-semibold" :for="id">{{ label }}</Label>
    <!-- class="w-36 flex select-none bg-white items-center rounded-lg shadow-sm text-center text-green10 border p-1 data-[invalid]:border-red-500" -->
    <TimeFieldRoot
      :id="id"
      v-slot="{ segments }"
      :disabled="typeof $attrs['disabled'] !== 'undefined'"
      class="flex items-center justify-center gap-2"
      :class="
        timefield({
          intent,
          size,
          disabled: typeof $attrs['disabled'] !== 'undefined',
          resize,
        })
      "
      :model-value="modelValue"
      :locale="locale"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    >
      <template v-for="item in segments" :key="item.part">
        <TimeFieldInput v-if="item.part === 'literal'" :part="item.part">
          {{ item.value }}
        </TimeFieldInput>
        <TimeFieldInput v-else :part="item.part" class="rounded p-0.5 focus:outline-none focus:ring-1 focus:ring-green-500 data-[placeholder]:text-green9">
          {{ item.value }}
        </TimeFieldInput>
      </template>
    </TimeFieldRoot>
  </fieldset>
</template>
