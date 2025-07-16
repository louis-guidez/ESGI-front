<script setup>
const { user } = extractStore(useUserStore())
</script>

<template>
  <div class="p-2 w-full flex justify-between items-center bg-white shadow">
    <uiButton intent="primary" size="md">
      <NuxtLink to="/login" class="flex items-center gap-2">
        <Icon :size="16" name="fluent:add-12-filled" />
        <span class="font-semibold leading-0">{{ $t('createAnAd') }}</span>
      </NuxtLink>
    </uiButton>

    <uiButton intent="ghost" class="!p-0">
      <NuxtLink :to="user ? '/profile' : '/login'" class="flex items-center gap-2">
        <Icon :size="24" name="fluent:person-12-filled" />
        <span v-if="user?.prenom" class="font-semibold leading-0">{{ user.prenom }}</span>
      </NuxtLink>
    </uiButton>
  </div>
</template>
