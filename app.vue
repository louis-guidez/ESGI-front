<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <ClientOnly>
      <Toaster rich-colors />
    </ClientOnly>
  </NuxtLayout>
</template>
