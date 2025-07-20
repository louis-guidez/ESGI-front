<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <NuxtLayout>
    <NuxtPage class="min-h-screen" />

    <ClientOnly>
      <Toaster rich-colors />
    </ClientOnly>
  </NuxtLayout>
</template>
