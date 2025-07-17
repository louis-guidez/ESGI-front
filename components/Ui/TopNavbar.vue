<script setup>
const { user, logout } = extractStore(useUserStore())
</script>

<template>
  <div class="p-2 w-full flex justify-between items-center bg-white shadow">
    <uiButton intent="primary" size="md">
      <NuxtLink to="/login" class="flex items-center gap-2">
        <Icon :size="16" name="fluent:add-12-filled" />
        <span class="font-semibold leading-0">{{ $t('createAnAd') }}</span>
      </NuxtLink>
    </uiButton>

    <div class="inline-flex gap-2">
      <uiButton intent="ghost" class="!p-0">
        <NuxtLink :to="user ? '/profile' : '/login'" class="flex items-center gap-2">
          <Icon :size="24" name="fluent:person-12-filled" />
          <span v-if="user?.prenom" class="font-semibold leading-0">{{ user.prenom }}</span>
        </NuxtLink>
      </uiButton>

      <uiButton v-if="user" intent="ghost" class="!p-0" @click="logout">
        <Icon :size="24" name="fluent:sign-out-20-regular" />
      </uiButton>
    </div>
  </div>
</template>
