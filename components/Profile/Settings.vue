<script setup lang="ts">
const { locales, setLocale } = useI18n()

const { settings } = extractStore(useUserStore())
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl font-bold mb-8">{{ $t('settings') }}</h1>
    <UiSelect
      v-model="settings.locale"
      :options="locales.map((l) => ({ label: l.name || '', value: l.code }))"
      :label="$t('language')"
      @update:model-value="setLocale($event)"
    />
  </div>
</template>
