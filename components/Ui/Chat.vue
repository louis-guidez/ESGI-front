<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps<{ contactUserId: number }>()
const userStore = useUserStore()
const user = userStore.user

const currentUserId = user.id
const messages = ref<any[]>([])
const messageText = ref('')
const chatContainer = ref<HTMLElement | null>(null)
const eventSource = ref<EventSource | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight, behavior: 'smooth' })
}

const fetchHistory = async () => {
  if (!props.contactUserId) return

  try {
    const res = await fetch(`http://localhost:8000/api/secure/messages/conversation/${props.contactUserId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })

    const data = await res.json()
    messages.value = data
    scrollToBottom()
  } catch (err) {
    console.error('❌ Erreur chargement historique:', err)
  }
}

const createTopicId = (id1: number, id2: number) => {
  return id1 < id2 ? `${id1}-${id2}` : `${id2}-${id1}`
}

const startEventSource = () => {
  if (!props.contactUserId) return

  const topicId = createTopicId(currentUserId, props.contactUserId)
  const topicUrl = `https://chat.mercure/conversation/${topicId}`

  const url = new URL('http://localhost:3001/.well-known/mercure')
  url.searchParams.append('topic', topicUrl)

  const source = new EventSource(url)
  source.onmessage = (event) => {
    const data = JSON.parse(event.data)
    messages.value.push(data)
    scrollToBottom()
  }
  source.onerror = (err) => {
    console.error('⚠️ Mercure error:', err)
  }

  eventSource.value = source
}

const stopEventSource = () => {
  if (eventSource.value) {
    eventSource.value.close()
    eventSource.value = null
  }
}

const envoyerMessage = async () => {
  if (!messageText.value) return

  try {
    const res = await fetch('http://localhost:8000/api/secure/messages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify({
        contenu: messageText.value,
        to: props.contactUserId,
      }),
    })

    if (!res.ok) {
      const error = await res.json()
      console.error('❌ Erreur backend:', error)
    } else {
      messageText.value = ''
    }
  } catch (err) {
    console.error('❌ Erreur réseau:', err)
  }
}

onMounted(async () => {
  await fetchHistory()
  startEventSource()
})

// 🔁 Recharger quand le destinataire change
watch(() => props.contactUserId, async (newId, oldId) => {
  if (!newId || newId === oldId) return
  stopEventSource()
  messages.value = []
  await fetchHistory()
  startEventSource()
})
</script>

<template>
  <div class="flex flex-col gap-2 h-full">
    <div ref="chatContainer" class="grow overflow-y-auto p-2">
      <div v-for="msg in messages" :key="msg.id">
        <strong>{{ msg.from === currentUserId ? 'Moi' : 'Lui' }} :</strong>
        {{ msg.contenu }}
        <span class="text-xs text-gray-500">({{ msg.date }})</span>
      </div>
    </div>

    <div class="flex gap-2">
      <input v-model="messageText" class="flex-grow border px-2 py-1" placeholder="Votre message…" />
      <button @click="envoyerMessage" class="bg-blue-500 text-white px-4 py-1 rounded">Envoyer</button>
    </div>
  </div>
</template>
