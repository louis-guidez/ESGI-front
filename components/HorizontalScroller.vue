<template>
  <div class="relative w-full">
    <button v-if="showArrows" @click="scrollLeft" class="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <div ref="container" class="flex space-x-4 overflow-x-auto pb-4 w-full scrollbar-hide scroll-smooth">
      <slot />
    </div>
    <button v-if="showArrows" @click="scrollRight" class="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref(null)
const showArrows = ref(false)

function update() {
  if (container.value) {
    showArrows.value = container.value.scrollWidth > container.value.clientWidth
  }
}

function scrollLeft() {
  if (container.value) container.value.scrollBy({ left: -container.value.clientWidth, behavior: 'smooth' })
}

function scrollRight() {
  if (container.value) container.value.scrollBy({ left: container.value.clientWidth, behavior: 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', update)
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
