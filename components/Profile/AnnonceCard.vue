<template>
  <div class="w-full relative flex flex-col lg:flex-row rounded-xl overflow-hidden shadow border border-gray-200 bg-white">
    <!-- Bouton corbeille en haut à droite avec UiButton -->
    <div class="absolute top-2 right-2 flex gap-2">
      <template v-if="confirming">
        <UiButton intent="error" size="sm" @click="confirmDelete"> Supprimer </UiButton>
        <UiButton intent="ghost" size="sm" @click="confirming = false"> Annuler </UiButton>
      </template>
      <template v-else>
        <div class="absolute top-2 right-2 flex gap-2">
          <NuxtLink :to="`/Annonce/${annonce.id}`" class="inline-block">
            <UiButton intent="secondary" size="sm" title="Voir l'annonce">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </UiButton>
          </NuxtLink>
          <NuxtLink v-if="annonce.statut !== 'archived'" :to="`/editAnnonce/${annonce.id}`" class="inline-block">
            <UiButton intent="secondary" size="sm" title="Modifier l'annonce">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                />
              </svg>
            </UiButton>
          </NuxtLink>
          <template v-if="confirming">
            <UiButton intent="error" size="sm" @click="$emit('delete', annonce)">Supprimer</UiButton>
            <UiButton intent="ghost" size="sm" @click="confirming = false">Annuler</UiButton>
          </template>
          <template v-else>
            <UiButton v-if="annonce.statut !== 'archived'" intent="error" size="sm" class="!p-1" title="Supprimer l'annonce" @click="confirming = true">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
                />
              </svg>
            </UiButton>
          </template>
        </div>
      </template>
    </div>

    <!-- Image -->
    <div class="h-48 lg:h-auto lg:w-1/5 flex-shrink-0 bg-cover bg-center" :style="{ backgroundImage: `url(${annonce.photos[0]})` }"></div>

    <!-- Contenu -->
    <div class="p-4 flex flex-col justify-between flex-1">
      <div>
        <h2 class="text-lg font-semibold text-gray-800">{{ annonce.titre }}</h2>
        <div class="text-green-600 font-bold text-lg mt-1">{{ annonce.prix }} €</div>
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          :class="{ invisible: annonce.statut !== 'archived' }"
        >
          {{ $t('archived') }}
        </span>
      </div>

      <div class="text-sm text-gray-600 mt-4 space-y-1">
        <p>{{ annonce.categories[0] }}</p>
        <p>{{ formatDate(annonce.dateCreation) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const confirming = ref(false)

const props = defineProps<{ annonce: Annonce }>()

function confirmDelete() {
  confirming.value = false
  emit('delete', props.annonce)
}

const emit = defineEmits(['delete'])

function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR')
}
</script>
