<template>
  <fieldset class="flex flex-col gap-2">
    <label class="text-sm font-semibold">{{ label }}</label>
    <SelectRoot :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
      <SelectTrigger
        class="group relative flex items-center justify-between gap-2"
        :class="
          selectTrigger({
            intent,
            size,
            disabled: typeof $attrs['disabled'] !== 'undefined',
          })
        "
        aria-label="Customise options"
      >
        <SelectValue :placeholder="placeholder" />
        <Icon name="fluent:chevron-down-12-filled" :size="16" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          class="will-change-[transform] z-[100] !p-0"
          :class="
            selectContent({
              intent,
              size,
            })
          "
          :side-offset="5"
        >
          <!-- TODO -->
          <SelectScrollUpButton class="flex items-center justify-center h-[25px] cursor-default">
            <Icon name="fluent:chevron-up-12-filled" />
          </SelectScrollUpButton>

          <SelectViewport class="p-1">
            <template v-if="typeof options[0] === 'object' && 'options' in options[0]">
              <!-- eslint-disable-next-line prettier/prettier -->
              <template v-for="({ label: groupLabel, options: groupOptions }, i) in options as OptionGroup[]" :key="groupLabel">
                <SelectSeparator v-if="i > 0" class="h-[1px] bg-gray-300 m-1" />

                <SelectLabel
                  :class="
                    selectGroupLabel({
                      intent,
                      size,
                    })
                  "
                >
                  {{ groupLabel }}
                </SelectLabel>
                <SelectGroup>
                  <SelectItem
                    v-for="({ label: itemLabel, value, disabled }, j) in groupOptions"
                    :key="j"
                    class="flex items-center justify-between data-[highlighted]:outline-none"
                    :class="
                      selectItem({
                        intent,
                        size,
                        disabled: !!disabled,
                      })
                    "
                    :value="value"
                    :disabled="!!disabled"
                    @select="
                      (e) => {
                        if (e.detail.value === modelValue) {
                          e.preventDefault()
                          return emit('update:modelValue', null)
                        }
                      }
                    "
                  >
                    <SelectItemText>
                      {{ itemLabel }}
                    </SelectItemText>
                    <SelectItemIndicator class="inline-flex items-center justify-center">
                      <Icon name="fluent:checkmark-12-filled" class="!bg-green-500" />
                    </SelectItemIndicator>
                  </SelectItem>
                </SelectGroup>
              </template>
            </template>
            <template v-else>
              <SelectItem
                v-for="({ label: itemLabel, value, disabled }, j) in options as Option[]"
                :key="j"
                class="flex items-center justify-between data-[highlighted]:outline-none"
                :class="
                  selectItem({
                    intent,
                    size,
                    disabled: !!disabled,
                  })
                "
                :value="value"
                :disabled="!!disabled"
                @select="
                  (e) => {
                    console.log(e.detail.value, modelValue, e.detail.value === modelValue)
                    if (e.detail.value === modelValue) {
                      e.preventDefault()
                      return emit('update:modelValue', null)
                    }
                  }
                "
              >
                <SelectItemText>
                  {{ itemLabel }}
                </SelectItemText>
                <SelectItemIndicator class="inline-flex items-center justify-center">
                  <Icon name="fluent:checkmark-12-filled" class="!bg-green-500" />
                </SelectItemIndicator>
              </SelectItem>
            </template>
          </SelectViewport>

          <!-- TODO -->
          <SelectScrollDownButton class="flex items-center justify-center h-[25px] cursor-default">
            <Icon name="fluent:chevron-down-12-filled" />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </fieldset>
</template>

<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'

import { cva, type VariantProps } from 'class-variance-authority'

const selectTrigger = cva('selectTrigger', {
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

type SelectTriggerProps = VariantProps<typeof selectTrigger>

const selectContent = cva('selectContent', {
  variants: {
    intent: {
      primary: 'bg-white border border-gray-400',
    },
    size: {
      sm: 'px-2 py-1 rounded text-xs',
      md: 'px-4 py-2 rounded text-sm',
      lg: 'px-6 py-3 rounded text-md',
    },
  },
})

const selectGroupLabel = cva('selectGroupLabel', {
  variants: {
    intent: {
      primary: 'font-semibold',
    },
    size: {
      sm: 'px-2 py-1 rounded text-xs',
      md: 'px-4 py-2 rounded text-sm',
      lg: 'px-6 py-3 rounded text-md',
    },
  },
})

const selectItem = cva('selectItem', {
  variants: {
    intent: {
      primary: 'hover:bg-gray-100',
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

type Option = { label: string; value: string | number | null; disabled?: boolean }
type OptionGroup = { label: string; options: Option[] }

// TODO multiple values
withDefaults(
  defineProps<{
    label: string
    placeholder?: string
    modelValue: Option['value']
    options: Option[] | OptionGroup[]
    intent?: SelectTriggerProps['intent']
    size?: SelectTriggerProps['size']
  }>(),
  {
    placeholder: 'Sélectionner une option',
    intent: 'primary',
    size: 'md',
    disabled: false,
  },
)

const emit = defineEmits(['update:modelValue'])
</script>
