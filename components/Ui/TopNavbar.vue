<script setup>
const { user, logout } = extractStore(useUserStore())

const search = ref('')
const searchRef = ref()

defineExpose({ search, searchRef })
</script>

<template>
  <div class="h-16 p-2 w-full flex justify-between items-center gap-4 bg-white shadow">
    <div class="inline-flex gap-2 items-center justify-center">
      <NuxtLink to="/" class="px-2">
        <UiLogo />
      </NuxtLink>
    </div>

    <form class="size-full max-w-[400px] py-1 inline-flex gap-1 items-center justify-center" @submit.prevent="console.log(search.trim())">
      <UiInput ref="searchRef" v-model="search" type="search" :placeholder="$t('search')" class="size-full" />
      <UiButton class="h-full aspect-square" size="sm">
        <Icon :size="18" name="fluent:search-12-filled" />
      </UiButton>
    </form>

    <div class="inline-flex gap-2 items-center justify-center">
      <uiButton intent="primary" size="md" class="lg:block hidden">
        <NuxtLink to="/login" class="flex items-center gap-2">
          <Icon :size="16" name="fluent:add-12-filled" />
          <span class="font-semibold leading-0">{{ $t('createAnAd') }}</span>
        </NuxtLink>
      </uiButton>

      <uiButton intent="ghost" class="!p-2">
        <NuxtLink :to="user ? '/profile' : '/login'" class="flex items-center gap-2">
          <Icon :size="24" name="fluent:person-12-filled" />
        </NuxtLink>
      </uiButton>

      <uiButton v-if="user" intent="ghost" class="!p-2" @click="logout">
        <Icon :size="24" name="fluent:sign-out-20-regular" />
      </uiButton>
    </div>
  </div>
</template>
