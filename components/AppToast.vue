<!-- components/AppToast.vue -->
<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed bottom-16 right-4 z-20 px-4 py-2 rounded shadow-lg text-white',
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'success',
  },
})

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 3000)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
