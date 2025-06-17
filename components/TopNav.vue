<template>
  <header>
    <nav class="fixed top-0 left-0 right-0 bg-white border-b shadow flex items-center justify-between px-4 h-16 z-20">
      <NuxtLink to="/" class="flex items-center font-semibold text-lg space-x-2" aria-label="Accueil">
        <span>MyApp</span>
      </NuxtLink>
      <button
        class="md:hidden p-2"
        @click="toggle"
        aria-label="Ouvrir le menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      <ul class="hidden md:flex space-x-6">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to" class="hover:text-blue-600">{{ link.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <div v-if="open" class="md:hidden fixed top-16 left-0 right-0 bg-white shadow z-10">
      <ul class="flex flex-col p-4 space-y-2">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to" class="block py-2" @click="close">{{ link.label }}</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const links = [
  { to: '/home', label: 'Accueil' },
  { to: '/annonces', label: 'Annonces' },
  { to: '/messages', label: 'Messages' },
  { to: '/profile', label: 'Profil' },
]

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}
</script>
