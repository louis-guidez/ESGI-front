<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  type TooltipContentProps,
  type TooltipProviderProps,
} from 'reka-ui'

const tooltip = cva('tooltip', {
  variants: {
    intent: {
      primary: 'bg-white shadow rounded',
    },
    size: {
      sm: 'p-2 text-xs',
      md: 'p-3 text-sm',
      lg: 'p-4 text-md',
    },
  },
})

type TooltipProps = VariantProps<typeof tooltip>

const tooltipArrow = cva('tooltipArrow', {
  variants: {
    intent: {
      primary: 'fill-white fill-white -translate-y-[1px]',
    },
    size: {
      sm: 'w-3 h-1',
      md: 'w-4 h-2',
      lg: 'w-5 h-3',
    },
  },
})

withDefaults(
  defineProps<{
    intent?: TooltipProps['intent']
    size?: TooltipProps['size']
    disableClosingTrigger?: TooltipProviderProps['disableClosingTrigger']
    delayDuration?: TooltipProviderProps['delayDuration']
    side?: TooltipContentProps['side']
    updatePositionStrategy?: TooltipContentProps['updatePositionStrategy']
    arrow?: boolean
  }>(),
  {
    intent: 'primary',
    size: 'md',
    disableClosingTrigger: false,
    delayDuration: 400,
    side: 'top',
    updatePositionStrategy: 'optimized',
    arrow: true,
  },
)
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot>
      <TooltipTrigger>
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="will-change-[transform,opacity]"
          :class="
            tooltip({
              intent,
              size,
            })
          "
          :side="side"
          :update-position-strategy="updatePositionStrategy"
        >
          <slot />
          <TooltipArrow
            v-if="arrow"
            :class="
              tooltipArrow({
                intent,
                size,
              })
            "
          />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
