<script setup lang="ts">
const { t } = useI18n()

const footerLinks = [
  [
    { label: t('home'), to: '/' },
    { label: t('profile'), to: '/profile' },
    { label: t('createAnAd'), to: '/' },
    { label: t('login'), to: '/login' },
  ],
  [
    { label: t('contact'), to: '/contact' },
    { label: t('aboutUs'), to: '/about' },
    { label: t('cgu'), to: '/cgu' },
  ],
]
</script>

<template>
  <footer class="m-8 py-8 h-full flex items-center gap-4 flex-wrap bg-green-400 rounded-xl shadow-lg">
    <div class="h-full flex items-end flex-[0_1_25%] p-8"><UiLogo class="text-[5rem] [&>span]:text-white" /></div>
    <div class="flex-[1_1_500px] p-8 flex flex-wrap gap-12 lg:gap-48">
      <ul v-for="(links, i) in footerLinks" :key="i" class="flex flex-col gap-2">
        <li v-for="link in links" :key="link.label">
          <NuxtLink :to="link.to" class="text-lg hover:underline font-semibold">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
