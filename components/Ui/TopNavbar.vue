<script setup>
const { user, logout } = extractStore(useUserStore())
</script>

<template>
  <div class="h-16 p-2 w-full flex justify-between items-center bg-white shadow">
    <div class="inline-flex gap-2 items-center justify-center">
      <NuxtLink to="/" class="px-2">
        <UiLogo />
      </NuxtLink>
    </div>

    <div class="inline-flex gap-2 items-center justify-center">
      <uiButton intent="primary" size="md">
        <NuxtLink to="/login" class="flex items-center gap-2">
          <Icon :size="16" name="fluent:add-12-filled" />
          <span class="hidden md:inline font-semibold leading-0">{{ $t('createAnAd') }}</span>
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
