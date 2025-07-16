<script setup lang="ts">
defineOgImageComponent('Lendo', {
  headline: '🛒',
  title: 'Lendo',
  description: 'Lendo',
  theme: 'green',
  colorMode: 'dark',
})
</script>

<template>
  <div>
    <h1>Index</h1>
    <NuxtLink :to="'/profile'" class="flex items-center gap-2">
      <Icon :size="24" name="fluent:person-12-filled" />
    </NuxtLink>
  </div>
</template>
