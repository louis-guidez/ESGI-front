<script setup lang="ts">
import { isObject, useFocus } from '@vueuse/core'
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

const props = withDefaults(
  defineProps<{
    id?: string
    type?: string
    label?: string
    modelValue?: string | { value: string; files: FileList }
    intent?: InputProps['intent']
    size?: InputProps['size']
    errorMessage?: string
    required?: boolean
  }>(),
  {
    id: '',
    label: undefined,
    modelValue: '',
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
    <span v-if="label || required" class="flex items-center gap-1">
      <label v-if="label" :for="id" class="text-sm font-semibold">{{ label }}</label>
      <span v-if="required" class="text-red-500">*</span>
    </span>
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
      :value="type === 'file' ? (isObject(modelValue) && 'value' in modelValue ? modelValue.value : '') : modelValue"
      @input="
        $emit(
          'update:modelValue',
          props.type === 'file'
            ? { value: ($event?.target as HTMLInputElement)?.value, files: ($event?.target as HTMLInputElement)?.files }
            : ($event?.target as HTMLInputElement)?.value,
        )
      "
    />
    <slot v-if="errorMessage" name="error" v-bind="{ errorMessage }">
      <span class="text-red-500">{{ $te(errorMessage) ? $t(errorMessage) : errorMessage }}</span>
    </slot>
  </fieldset>
</template>
