<script setup>
import { computed } from 'vue'

const props = defineProps({
  annonce: {
    type: Object,
    default: () => ({}),
  },
  isFavorite: Boolean,
})

defineEmits(['toggle-favorite'])

// const location = computed(() => {
//   return ''
// })

const seller = computed(() => {
  const name = props.annonce?.user?.prenom
  const lastname = props.annonce?.user?.nom
  const email = props.annonce?.user?.email

  if (name && lastname) return `${name} ${lastname.toUpperCase()}`
  if (!email) return `${email}`
  return ''
})
</script>

<template>
  <div class="size-full overflow-hidden rounded-lg bg-white aspect-[6/5] relative" :title="`${annonce.titre} - ${annonce.prix}€`">
    <NuxtLink :to="`/annonce/${annonce.id}`" class="">
      <div class="h-full flex flex-col">
        <div class="flex h-full overflow-hidden bg-gray-200">
          <NuxtImg :src="annonce.photos?.[0]" alt="photo" class="size-full object-cover" />
        </div>
        <div class="h-1/2 p-4 flex flex-col gap-2 justify-between">
          <span class="font-semibold text-lg truncate">{{ annonce.titre }}</span>

          <span class="text-xs">{{ `${annonce.user.ville}, ${annonce.user.postalCode}` }}</span>

          <div class="inline-flex w-full justify-between">
            <span class="truncate">{{ seller }}</span>
            <span class="text-green-500 font-semibold">{{ annonce.prix }}€</span>
          </div>
        </div>
      </div>
    </NuxtLink>
    <button class="group absolute top-4 right-4 z-10 cursor-pointer" @click.prevent="$emit('toggle-favorite', annonce)">
      <Icon name="fluent:heart-12-filled" size="36" class="text-white group-hover:text-green-600 shadow-lg" :class="{ 'text-green-600': isFavorite }" />
    </button>
  </div>
</template>
