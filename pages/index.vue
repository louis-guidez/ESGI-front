<!-- pages/index.vue -->
<template>
  <div>
    <h1>Utilisateurs</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data: users } = await useAsyncData('users', () => $fetch('http://localhost:8000/api/users'))
</script>
