<template>
  <NuxtLayout>
    <div class="w-full h-screen flex flex-col items-center justify-center gap-4">
      <div class="text-[10rem] font-bold">4<span class="text-green-500">0</span>4</div>
      <UiButton class="font-bold button" @click="router.go(-1)">Retourner en arrière</UiButton>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const router = useRouter()
</script>
