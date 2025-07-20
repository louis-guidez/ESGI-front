<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()

const newUserIdChat = computed(() => Number(route.query.newUserIdChat))

// const { t } = useI18n()

const { user, getUsers } = extractStore(useUserStore())

const { data: newUser } = useAsyncData<User | undefined>(
  'newUserIdChat',
  async () => {
    if (!newUserIdChat.value) return
    const users = await getUsers()

    return users.find((user) => user.id === newUserIdChat.value)
  },
  {
    watch: [newUserIdChat],
  },
)

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('xl')

const menuOpen = ref(true)

watch(
  isMobile,
  (isMobile) => {
    if (isMobile) {
      menuOpen.value = false
    } else {
      menuOpen.value = true
    }
  },
  { immediate: true },
)

const fetchConversations = async (user: User & { token: string }) => {
  if (!user?.token) return

  try {
    const data = await apiFetch(`secure/conversations`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })

    return data
  } catch (err) {
    console.error('❌ Erreur chargement historique:', err)
  }
}

interface Conversation {
  conversationId: number
  with: {
    id: number
    nom: string
    prenom: string
  }
}

const { data: conversations } = useAsyncData<Conversation[]>(
  'conversations',
  async () => {
    if (!user.value) return

    return await fetchConversations(user.value)
  },
  { watch: [user] },
)

const selectedConversation = ref<number | null>(null)

onMounted(async () => {
  if (newUserIdChat.value) {
    selectedConversation.value = newUserIdChat.value
  }
})

watch(
  conversations,
  (newConv) => {
    if (!newConv || selectedConversation.value) return
    selectedConversation.value = newConv[0]?.with.id
  },
  { immediate: true, flush: 'post' },
)
</script>

<template>
  <div class="relative flex h-[calc(100vh-4rem)] overflow-hidden">
    <UiButton intent="ghost" class="fixed top-[4.5rem] left-2 !p-2 z-[999] !bg-white shadow" @click="menuOpen = !menuOpen">
      <Icon :size="24" name="fluent:list-16-filled" />
    </UiButton>

    <Transition name="slide">
      <div v-if="menuOpen" class="w-[90vw] xl:w-1/4 max-w-[400px] md:relative fixed bg-gray-100 z-10 h-full pt-16 px-4 overflow-hidden">
        <ul class="flex flex-col gap-2 overflow-y-auto">
          <li v-if="newUser && newUserIdChat && !conversations?.some((c) => c.with.id === newUserIdChat)">
            <UiButton intent="primary" size="lg" class="w-full text-left justify-start font-semibold" @click="selectedConversation = newUserIdChat">
              <span>
                {{ newUser.prenom || $t('newUser') }} <b class="font-bold uppercase">{{ newUser.nom }}</b>
              </span>
            </UiButton>
          </li>
          <li v-for="conversation in conversations" :key="conversation.conversationId">
            <UiButton
              :intent="selectedConversation === conversation.with.id ? 'primary' : 'ghost'"
              size="lg"
              class="w-full text-left justify-start font-semibold"
              @click="selectedConversation = conversation.with.id"
            >
              <span
                >{{ conversation.with.prenom || $t('newUser') }} <b class="font-bold uppercase">{{ conversation.with.nom }}</b></span
              >
            </UiButton>
          </li>
        </ul>
      </div>
    </Transition>

    <div class="size-full">
      <div class="h-14 w-full inline-flex justify-end items-center px-4">
        <span class="font-semibold">{{ `${user?.prenom ?? ''} ${user?.nom ?? ''}` }}</span>
      </div>

      <div class="w-full h-[90%] bg-white rounded-none md:rounded-l-2xl p-8 overflow-y-auto">
        <UiChat v-if="false" :contact-user-id="selectedConversation" />
        <div v-else class="h-full flex flex-col justify-center items-center">
          <Icon name="fluent:chat-16-regular" size="48" />
          <span class="text-2xl font-semibold">{{ $t('noConversation') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .slide-enter-to,
  .slide-leave-from {
    width: 90vw;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: width 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  width: 0;
}

/* .slide-enter-to,
.slide-leave-from {
  width: 25%;
} */
</style>
