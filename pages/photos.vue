<!-- pages/index.vue -->
<template>
  <div>
    <h1>Photos</h1>
    <ul>
      <li v-for="photo in photos" :key="photo.id">
        {{ photo.id }}
        {{ photo.urlChemin }}
        {{ photo.dateUpload }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data: photos } = await useAsyncData('photos', () => $fetch('http://localhost:8000/api/photos'))
</script>
