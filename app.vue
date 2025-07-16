<script lang="ts" setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

const { user } = extractStore(useUserStore())

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user') || 'null')
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <ClientOnly>
      <Toaster rich-colors />
    </ClientOnly>
  </NuxtLayout>
</template>
