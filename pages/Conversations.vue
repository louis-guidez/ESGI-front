<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chat from '~/components/Ui/Chat.vue'

import { useUserStore } from '@/stores/user'

definePageMeta({ middleware: ['auth'] })

const { t } = useI18n()
const { user } = extractStore(useUserStore())

const utilisateurs = ref<any[]>([])
const contactUserId = ref<number | null>(null)
const selectedUser = ref<any | null>(null)
const loading = ref(false)

const fetchUtilisateurs = async () => {
  try {
    loading.value = true
    const res = await $fetch('http://localhost:8000/api/utilisateurs', {
      headers: {
        Authorization: `Bearer ${user.value.token}`,
      },
    })

    utilisateurs.value = res.filter((u: any) => u.id !== user.value.id)
  } catch (err) {
    console.error('Erreur chargement utilisateurs:', err)
  } finally {
    loading.value = false
  }
}

const selectUser = (u: any) => {
  contactUserId.value = u.id
  selectedUser.value = u
}

onMounted(fetchUtilisateurs)
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <h2 class="text-2xl font-semibold">{{ $t('conversations') }}</h2>

    <div v-if="loading" class="italic">{{ $t('loading') }}</div>

    <div v-if="utilisateurs.length" class="flex flex-col gap-2">
      <h2>{{ $t('chooseUserToChat') }}</h2>
      <UiButton
        v-for="u in utilisateurs"
        :key="u.id"
        intent="ghost"
        class="justify-start"
        :class="{ 'bg-green-100': contactUserId === u.id }"
        @click="selectUser(u)"
      >
        {{ u.id }} {{ u.email }} {{ u.prenom }} {{ u.nom }}
      </UiButton>
    </div>
    <div v-else-if="!loading" class="text-gray-500">{{ $t('noOtherUsers') }}</div>
    <div v-if="contactUserId" class="p-4 mt-4 flex flex-col gap-4">
      <h1 class="text-xl font-semibold">
        {{
          $t('conversationWith', {
            user: selectedUser ? `${selectedUser.id} ${selectedUser.email} ${selectedUser.prenom} ${selectedUser.nom}` : '',
          })
        }}
      </h1>
      <Chat :contact-user-id="contactUserId" />
    </div>
  </div>
</template>
