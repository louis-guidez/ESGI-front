<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const { t } = useI18n()

const menuRef = useTemplateRef<HTMLElement>('menu-ref')

defineEmits(['searchFocus'])

const menuOpen = ref(false)

onClickOutside(menuRef, () => {
  menuOpen.value = false
})

const menuOptions: { label: string; to: string }[] = [
  {
    label: t('home'),
    to: '/',
  },
  {
    label: t('profile'),
    to: '/profile',
  },
  {
    label: t('createAnAd'),
    to: '/login',
  },
  {
    label: t('contact'),
    to: '/contact',
  },
  {
    label: t('aboutUs'),
    to: '/about',
  },
]
</script>

<template>
  <div class="h-18 w-full flex justify-between items-center bg-white shadow">
    <div class="size-full flex items-center justify-center">
      <NuxtLink to="/" class="size-full px-2 flex flex-col items-center justify-center">
        <Icon :size="32" name="fluent:home-12-filled" />
        <UiLogo class="!text-[1rem]" />
      </NuxtLink>
    </div>
    <div class="size-full flex items-center justify-center">
      <NuxtLink to="/" class="size-full px-2 flex items-center justify-center">
        <Icon :size="32" name="fluent:add-12-filled" />
      </NuxtLink>
    </div>
    <div class="relative size-full flex items-center justify-center">
      <UiButton
        intent="primary"
        size="lg"
        class="absolute -top-10 aspect-square px-2 flex items-center justify-center !rounded-full !p-7"
        @click="$emit('searchFocus')"
      >
        <Icon :size="32" name="fluent:search-16-filled" />
      </UiButton>
    </div>
    <div class="size-full flex items-center justify-center">
      <NuxtLink to="/favorites" class="size-full px-2 flex items-center justify-center">
        <Icon :size="32" name="fluent:heart-12-filled" />
      </NuxtLink>
    </div>
    <div class="size-full flex items-center justify-center">
      <UiButton intent="ghost" class="size-full px-2 flex items-center justify-center" @click="menuOpen = !menuOpen">
        <Icon :size="32" name="fluent:list-16-filled" />
      </UiButton>
    </div>

    <Transition name="slide">
      <div v-if="menuOpen" ref="menu-ref" class="w-full fixed bg-gray-100 h-full overflow-hidden shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)] rounded-t-2xl">
        <div class="w-full flex justify-end">
          <UiButton intent="ghost" class="px-2 flex items-center justify-center" @click="menuOpen = !menuOpen">
            <Icon :size="32" name="fluent:add-12-filled" class="rotate-45" />
          </UiButton>
        </div>
        <ul class="mt-8 flex flex-col">
          <li v-for="option in menuOptions" :key="option.label">
            <NuxtLink :to="option.to" class="flex items-center gap-8 text-4xl font-bold px-18 py-8" @click="menuOpen = false">
              <span>{{ option.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
</style>
