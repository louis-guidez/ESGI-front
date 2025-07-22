<script setup lang="ts">
const route = useRoute()

const id = computed(() => route.params.id)

const { user } = extractStore(useUserStore())
const { getAnnonce } = extractStore(useAnnonceStore())

const { data } = await useAsyncData<Annonce | undefined>('annonce', () => getAnnonce(Number(id.value)))

const selectedImage = ref(0)
</script>

<template>
  <div class="p-8 flex flex-col lg:flex-row justify-center gap-8">
    <div class="pt-12 p-12 lg:p-24 flex-[2_1_auto] flex flex-col gap-8">
      <NuxtLink v-if="user?.id === data?.user?.id" :to="`/editAnnonce/${id}`">
        <UiButton>{{ $t('editAnnonce') }}</UiButton>
      </NuxtLink>

      <div class="max-h-[50vh] w-full flex gap-4 overflow-hidden">
        <div class="w-4/5 flex flex-col bg-green-200 rounded-2xl overflow-hidden">
          <NuxtImg v-if="data" :src="data.photos[selectedImage]" class="w-full object-cover aspect-16/9" />
        </div>
        <ul class="w-1/5 flex flex-col gap-4 overflow-y-auto">
          <li
            v-for="(photo, i) in data?.photos"
            :key="photo"
            class="flex-[0_0_auto] w-full bg-green-200 rounded-2xl overflow-hidden aspect-16/9 cursor-pointer"
            @click="selectedImage = i"
          >
            <NuxtImg v-if="data" :src="photo" class="size-full object-cover aspect-16/9" />
          </li>
        </ul>
      </div>

      <div class="ld:w-[79.25%] p-8 rounded-xl flex flex-col gap-4 bg-white">
        <div class="mb-2 flex items-end justify-between gap-8">
          <h1 class="text-3xl font-bold">{{ data?.titre || 'Chargement...' }}</h1>

          <span class="inline-flex gap-8 items-end">
            <h2 class="text-lg font-semibold">{{ data?.prix }}€</h2>
            <span class="flex gap-2">
              <!-- TODO REDIRECT TO CHAT -->
              <UiButton intent="secondary">{{ $t('contactVendor') }}</UiButton>

              <NuxtLink :to="`/checkout?annonce=${id}`">
                <UiButton>{{ $t('reserve') }}</UiButton>
              </NuxtLink>
            </span>
          </span>
        </div>

        <ul v-if="data?.categories" class="w-full flex gap-2">
          <li v-for="categorie in data?.categories" :key="categorie">
            <UiBadge>
              {{ categorie }}
            </UiBadge>
          </li>
        </ul>

        <div class="p-4">
          <p class="flex-[1_1_auto]">
            {{ data?.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="p-12 flex-[1_1_auto] flex flex-col gap-8 bg-white rounded-2xl">
      <div v-if="data?.user">
        <div class="flex items-center gap-4">
          <div class="w-1/4 aspect-square bg-gray-300 rounded-xl flex items-center justify-center">
            <Icon name="fluent:person-24-filled" size="48" />

            <!-- <NuxtImg :src="data.user.avatar" class="w-12 h-12 rounded-full" /> -->
          </div>

          <div class="p-2 flex flex-col gap-2">
            <div class="p-2 flex flex-col">
              <h2 class="text-lg font-semibold">{{ data.user.prenom }} {{ data.user.nom }}</h2>
              <span class="text-sm text-gray-500">{{ data.user.email }}</span>
              <span class="text-sm text-gray-500">{{ data.user.ville }}</span>
            </div>

            <UiButton>{{ $t('contactVendor') }}</UiButton>
          </div>
        </div>
      </div>

      <UiMap />

      <NuxtLink :to="`/checkout?annonce=${id}`">
        <UiButton class="w-full">{{ $t('reserve') }}</UiButton>
      </NuxtLink>
    </div>
  </div>
</template>
