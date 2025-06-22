<template>
  <NuxtLayout>
    <NuxtPage />

    <ClientOnly>
      <Toaster richColors />
    </ClientOnly>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>
