<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Account from '~/components/Profile/Account.vue'

definePageMeta({
  middleware: ['auth'],
})

const { t } = useI18n()

const { user } = extractStore(useUserStore())

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('xl')

const menuOpen = ref(true)

watch(isMobile, (isMobile) => {
  if (isMobile) {
    menuOpen.value = false
  } else {
    menuOpen.value = true
  }
})

const menuOptions = [
  {
    label: t('account'),
    component: shallowRef(Account),
  },
  {
    label: t('settings'),
    component: shallowRef(Account),
  },
]
const selectedMenuOption = ref(menuOptions[0])
</script>

<template>
  <div class="relative flex h-[calc(100vh-48px)] overflow-hidden">
    <UiButton intent="ghost" class="fixed top-16 left-2 !p-2 z-[999] !bg-white shadow" @click="menuOpen = !menuOpen">
      <Icon :size="24" name="fluent:list-16-filled" />
    </UiButton>

    <Transition name="slide">
      <div v-if="menuOpen" class="w-[90vw] xl:w-1/4 max-w-[400px] md:relative fixed bg-gray-100 z-10 h-full pt-16 px-4 overflow-hidden">
        <ul class="flex flex-col gap-2">
          <li v-for="option in menuOptions" :key="option.label">
            <UiButton
              :intent="selectedMenuOption.label === option.label ? 'primary' : 'ghost'"
              size="lg"
              class="w-full text-left justify-start font-semibold"
              @click="selectedMenuOption = option"
            >
              {{ option.label }}
            </UiButton>
          </li>
        </ul>
      </div>
    </Transition>

    <div class="size-full">
      <div class="h-14 w-full inline-flex justify-end items-center px-4">
        <span class="font-semibold">{{ `${user?.prenom ?? ''} ${user?.nom ?? ''}` }}</span>
      </div>

      <div class="w-full h-[95%] bg-white rounded-none md:rounded-l-2xl p-8 overflow-y-auto">
        <component :is="selectedMenuOption.component" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .slide-enter-to,
  .slide-leave-from {
    width: 90vw;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: width 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  width: 0;
}

/* .slide-enter-to,
.slide-leave-from {
  width: 25%;
} */
</style>
