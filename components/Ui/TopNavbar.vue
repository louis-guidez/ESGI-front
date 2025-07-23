<script setup>
const router = useRouter()

const { user, logout } = extractStore(useUserStore())
const { search } = extractStore(useAnnonceStore())

const searchValue = ref('')
const searchRef = ref()

const handleSearch = () => {
  search.value = searchValue.value.trim()
  router.push({ path: '/Annonce/List' })
}

const config = useRuntimeConfig()

defineExpose({ search, searchRef })
</script>

<template>
  <div class="h-16 p-2 w-full flex justify-between items-center gap-4 bg-white shadow">
    <div class="inline-flex gap-2 items-center justify-center">
      <NuxtLink to="/" class="px-2">
        <UiLogo />
      </NuxtLink>
    </div>

    <form class="size-full max-w-[400px] py-1 inline-flex gap-1 items-center justify-center" @submit.prevent="handleSearch">
      <UiInput ref="searchRef" v-model="searchValue" type="search" :placeholder="$t('search')" class="size-full" />
      <UiButton class="h-full aspect-square" size="sm" type="submit">
        <Icon :size="18" name="fluent:search-12-filled" />
      </UiButton>
    </form>

    <div class="inline-flex gap-2 items-center justify-center">
      <NuxtLink to="/CreateAnnonce" class="hidden lg:flex items-center gap-2">
        <uiButton intent="primary" size="md" class="flex items-center gap-2">
          <Icon :size="16" name="fluent:add-12-filled" />
          <span class="font-semibold leading-0">{{ $t('createAnAd') }}</span>
        </uiButton>
      </NuxtLink>

      <NuxtLink :to="user ? '/conversations' : '/login'" class="flex items-center gap-2">
        <uiButton intent="ghost" class="!p-2 flex items-center gap-2">
          <Icon :size="24" name="fluent:chat-20-filled" />
        </uiButton>
      </NuxtLink>

      <NuxtLink v-if="config?.public?.ENV_MODE === 'dev'" :to="'/testslouis'" class="flex items-center gap-2">
        <uiButton intent="ghost" class="!p-2 flex items-center gap-2">
          <Icon :size="24" name="fluent:settings-20-filled" />
        </uiButton>
      </NuxtLink>

      <NuxtLink :to="user ? '/profile' : '/login'" class="flex items-center gap-2">
        <uiButton intent="ghost" class="!p-2 flex items-center gap-2">
          <Icon :size="24" name="fluent:person-12-filled" />
        </uiButton>
      </NuxtLink>

      <uiButton v-if="user" intent="ghost" class="!p-2" @click="logout">
        <Icon :size="24" name="fluent:sign-out-20-regular" />
      </uiButton>
    </div>
  </div>
</template>
