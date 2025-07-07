<script setup lang="ts">
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
  Label,
  type DateValue,
} from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'

const { locale } = useI18n()

const datePickerField = cva('datePickerField', {
  variants: {
    intent: {
      primary: 'border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
    },
    size: {
      sm: 'pr-1 rounded text-xs',
      md: 'pr-1 rounded text-sm',
      lg: 'pr-1 rounded text-md',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
})

type DatePickerFieldProps = VariantProps<typeof datePickerField>

const datePickerInput = cva('datePickerInput', {
  variants: {
    intent: {
      primary: '',
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

type DatePickerInput = VariantProps<typeof datePickerInput>

const datePickerContent = cva('datePickerContent', {
  variants: {
    intent: {
      primary: 'border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
    },
    size: {
      sm: 'pr-1 rounded-lg text-xs',
      md: 'pr-1 rounded-lg text-sm',
      lg: 'pr-1 rounded-lg text-md',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
})

withDefaults(
  defineProps<{
    id?: string
    type?: string
    label: string
    modelValue: DateValue
    intent?: DatePickerFieldProps['intent']
    size?: DatePickerFieldProps['size']
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
  <fieldset class="flex flex-col gap-2">
    <Label class="text-sm font-semibold" :for="id">{{ label }}</Label>
    <DatePickerRoot :id="id" :locale="locale" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)">
      <DatePickerField
        v-slot="{ segments }"
        :disabled="typeof $attrs['disabled'] !== 'undefined'"
        class="inline-flex items-center justify-center gap-2"
        :class="
          datePickerField({
            intent,
            size,
            disabled: typeof $attrs['disabled'] !== 'undefined',
          })
        "
      >
        <div
          class="flex items-center"
          :class="
            datePickerInput({
              intent,
              size,
              disabled: typeof $attrs['disabled'] !== 'undefined',
            })
          "
        >
          <template v-for="item in segments" :key="item.part">
            <DatePickerInput v-if="item.part === 'literal'" :part="item.part">
              {{ item.value }}
            </DatePickerInput>
            <DatePickerInput
              v-else
              :part="item.part"
              class="rounded p-0.5 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9"
            >
              {{ item.value }}
            </DatePickerInput>
          </template>
        </div>

        <DatePickerTrigger class="size-9 flex items-center justify-center cursor-pointer hover:bg-gray-300 rounded">
          <Icon name="radix-icons:calendar" class="size-full" />
        </DatePickerTrigger>
      </DatePickerField>

      <DatePickerContent
        :side-offset="4"
        :disabled="typeof $attrs['disabled'] !== 'undefined'"
        class="inline-flex items-center justify-center gap-2"
        :class="
          datePickerContent({
            intent,
            size,
            disabled: typeof $attrs['disabled'] !== 'undefined',
          })
        "
      >
        <!-- class="rounded-xl bg-white border shadow-sm will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade" -->
        <DatePickerArrow class="fill-white stroke-gray-300" />
        <DatePickerCalendar v-slot="{ weekDays, grid }" class="p-4">
          <DatePickerHeader class="flex items-center justify-between">
            <DatePickerPrev
              class="inline-flex items-center cursor-pointer text-black justify-center rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              <Icon name="radix-icons:chevron-left" class="w-4 h-4" />
            </DatePickerPrev>

            <DatePickerHeading class="text-black font-medium" />
            <DatePickerNext
              class="inline-flex items-center cursor-pointer text-black justify-center rounded-md bg-transparent w-7 h-7 hover:bg-stone-50 active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
            >
              <Icon name="radix-icons:chevron-right" class="w-4 h-4" />
            </DatePickerNext>
          </DatePickerHeader>
          <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <DatePickerGrid v-for="month in grid" :key="month.value.toString()" class="w-full border-collapse select-none space-y-1">
              <DatePickerGridHead>
                <DatePickerGridRow class="mb-1 flex w-full justify-between">
                  <DatePickerHeadCell v-for="day in weekDays" :key="day" class="w-8 rounded-md text-xs text-green8">
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="flex w-full">
                  <DatePickerCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate">
                    <DatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="relative flex items-center justify-center whitespace-nowrap rounded-[9px] border border-transparent bg-transparent text-sm font-normal text-black w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black hover:border-black data-[selected]:bg-black data-[selected]:font-medium data-[outside-view]:text-black/30 data-[selected]:text-white data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-green9 data-[selected]:before:bg-white"
                    />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>
  </fieldset>
</template>
