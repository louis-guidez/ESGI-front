<!-- pages/index.vue -->
<template>
  <div>
    <nav>
      <select @change="navigate($event)">
        <option value="/">Accueil</option>
        <option value="/photos">CRUD Photos</option>
      </select>
    </nav>

    <h1>Utilisateurs</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const { data: users } = await useAsyncData('users', () =>
  $fetch('http://localhost:8000/api/users')
)

function navigate(event) {
  router.push(event.target.value)
}
</script>
