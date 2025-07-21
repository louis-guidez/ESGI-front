<script setup lang="ts">
import { ref, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const config = useRuntimeConfig()

const props = defineProps<{ contactUserId: number }>()
const { t } = useI18n()
const userStore = useUserStore()
const user = userStore.user

const currentUserId = user.id
const messages = ref<{ id: number; contenu: string; from: number; to: number; date: string }[]>([])
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
    const data = await apiFetch(`secure/messages/conversation/${props.contactUserId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })

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

  const url = new URL(config.public.MERCURE_BASE_URL)
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
    const res = await apiFetch('/secure/messages', {
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

    messageText.value = ''
    return res
  } catch (err) {
    console.error('❌ Erreur réseau:', err)
  }
}

onMounted(async () => {
  await fetchHistory()
  startEventSource()
})

onBeforeUnmount(() => {
  stopEventSource()
})

// 🔁 Recharger quand le destinataire change
watch(
  () => props.contactUserId,
  async (newId, oldId) => {
    if (!newId || newId === oldId) return
    stopEventSource()
    messages.value = []
    await fetchHistory()
    startEventSource()
  },
)
</script>

<template>
  <div class="flex flex-col gap-2 size-full">
    <div ref="chatContainer" class="size-full grow overflow-y-auto p-2 flex flex-col gap-2">
      <div v-for="msg in messages" :key="msg.id" class="flex flex-col" :class="msg.from === currentUserId ? 'items-end' : 'items-start'">
        <div class="max-w-[75%] px-3 py-2 rounded-lg text-sm" :class="msg.from === currentUserId ? 'bg-green-100' : 'bg-gray-200'">
          {{ msg.contenu }}
        </div>
        <span class="text-xs text-gray-500">{{ msg.date }}</span>
      </div>
    </div>

    <form class="w-full flex gap-2 items-end" @submit.prevent="envoyerMessage">
      <UiInput v-model="messageText" class="flex-grow" :placeholder="t('messagePlaceholder')" />
      <UiButton type="submit" intent="primary">{{ t('send') }}</UiButton>
    </form>
  </div>
</template>
