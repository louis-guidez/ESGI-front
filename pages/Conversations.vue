
<script setup>
import { ref, onMounted } from 'vue'
import Chat from '~/components/Ui/Chat.vue'

import { useUserStore } from '@/stores/user'

const { user } = extractStore(useUserStore())

const utilisateurs = ref([])
const contactUserId = ref(null)

const fetchUtilisateurs = async () => {
  try {
    const res = await $fetch('http://localhost:8000/api/utilisateurs', {
      headers: {
        Authorization: `Bearer ${user.value.token}`,
      },
    })

    // On exclut l’utilisateur connecté
    utilisateurs.value = res.filter((u) => u.id !== user.value.id)
  } catch (err) {
    console.error('Erreur chargement utilisateurs:', err)
  }
}

const selectUser = (id) => {
  contactUserId.value = id
}

onMounted(async () => {
  await fetchUtilisateurs()
})
</script>

<template>
  <div>
    <h2>Conversations</h2>

    <div v-if="utilisateurs.length" class="mt-6">
      <h2>👥 Choisir un utilisateur pour discuter</h2>
      <ul>
        <li
          v-for="u in utilisateurs"
          :key="u.id"
          @click="selectUser(u.id)"
          :class="{ selected: contactUserId === u.id }"
          style="cursor: pointer; padding: 5px; border: 1px solid #ccc; margin-bottom: 4px"
        >
          {{ u.prenom }} {{ u.nom }} (ID: {{ u.id }})
        </li>
      </ul>
    </div>

    <div v-if="contactUserId" class="p-4 mt-4">
      <h1 class="text-xl mb-4">Conversation avec l'utilisateur {{ contactUserId }}</h1>
      <Chat :contact-user-id="contactUserId" />
    </div>
  </div>
</template>
