<template>
  <div class="p-2 flex justify-between items-center bg-white shadow">
    <uiButton intent="primary" size="md">
      <NuxtLink to="/login" class="flex items-center gap-2">
        <Icon :size="16" name="fluent:add-12-filled" />
        <!-- TODO use i18n -->
        <span class="font-semibold leading-0">Déposer une annonce</span>
      </NuxtLink>
    </uiButton>

    <uiButton intent="ghost" class="!p-0">
      <NuxtLink to="/login">
        <Icon :size="24" name="fluent:person-12-filled" />
      </NuxtLink>
    </uiButton>
  </div>
</template>
