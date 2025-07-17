<script setup lang="ts">
import UiTopNavbar from '~/components/Ui/TopNavbar.vue'
const topNavbarRef = ref<InstanceType<typeof UiTopNavbar> | null>(null)

onMounted(() => {
  if (!topNavbarRef.value) return
  topNavbarRef.value.searchRef.focused = true
})
</script>

<template>
  <div>
    <uiTopNavbar ref="topNavbarRef" class="sticky top-0 z-[999]" />
    <slot />
    <uiBottomNavbar v-if="topNavbarRef" class="lg:hidden fixed bottom-0 z-[999]" @search-focus="topNavbarRef.searchRef.focused = true" />

    <UiFooter class="mb-28 lg:mb-8" />
  </div>
</template>
