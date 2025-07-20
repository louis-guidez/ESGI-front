<script setup lang="ts">
const members = [
  { id: 1, name: 'Théo DUPONT', picture: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Louis GUIDEZ', picture: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Léo DEMEILLIERS', picture: 'https://i.pravatar.cc/150?img=3' },
]
</script>

<template>
  <!-- TODO: i18n -->
  <div class="p-12 flex flex-col items-center">
    <h1 class="text-3xl font-bold">{{ $t('aboutUs') }}</h1>

    <section class="w-2/3">
      <h2 class="text-2xl font-bold mt-8 mb-4">{{ $t('aboutUs_values') }}</h2>
    </section>

    <section class="w-2/3">
      <h2 class="text-2xl font-bold mt-8 mb-4">{{ $t('aboutUs_team') }}</h2>

      <ul class="w-full flex flex-wrap gap-12">
        <li
          v-for="member in members"
          :key="member.id"
          class="p-8 flex flex-[1_1_auto] flex-col min-w-[200px] items-center rounded-2xl overflow-hidden shadow-lg bg-white aspect-11/16"
        >
          <div class="w-1/3 !rounded-[50%] overflow-hidden">
            <NuxtImg format="webp" :src="member.picture" class="size-full object-cover" />
          </div>
          <h3 class="text-lg font-bold mt-2">{{ member.name }}</h3>
        </li>
      </ul>
    </section>

    <section class="w-2/3">
      <h2 class="text-2xl font-bold mt-8 mb-4">{{ $t('aboutUs_vision') }}</h2>
    </section>
  </div>
</template>
