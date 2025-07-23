<template>
  <div class="w-full relative flex flex-col lg:flex-row rounded-xl overflow-hidden border-1 border-solid border-gray-300 bg-white">
    <div class="absolute top-2 right-2 flex gap-2">
      <template v-if="confirming">
        <UiButton intent="error" size="sm" @click="confirmCancel">Annuler la réservation</UiButton>
        <UiButton intent="ghost" size="sm" @click="confirming = false">Annuler</UiButton>
      </template>
      <template v-else>
        <UiButton
          v-if="reservation.statut === 'confirmee' || reservation.statut === 'en cours'"
          intent="error"
          size="sm"
          class="!p-1"
          title="Annuler la réservation"
          @click="confirming = true"
        >
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

    <div class="h-48 lg:h-auto lg:w-1/5 flex-shrink-0 bg-cover bg-center" :style="{ backgroundImage: `url(${reservation.annonce.photos[0]})` }"></div>

    <div class="p-4 flex flex-col justify-between flex-1">
      <div>
        <h2 class="text-lg font-semibold text-gray-800">{{ reservation.annonce.titre }}</h2>
        <div class="text-green-600 font-bold text-lg mt-1">{{ reservation.annonce.prix }} €</div>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {{ reservation.statut }}
        </span>
      </div>

      <div class="text-sm text-gray-600 mt-4 space-y-1">
        <p><strong>Catégorie :</strong> {{ reservation.annonce.categories[0] }}</p>
        <p><strong>Date de création :</strong> {{ formatDate(reservation.annonce.dateCreation) }}</p>
        <p><strong>Date de début :</strong> {{ formatDate(reservation.dateDebut) }}</p>
        <p><strong>Date de fin :</strong> {{ formatDate(reservation.dateFin) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const confirming = ref(false)

const emit = defineEmits<{
  (e: 'cancel', reservation: Reservation): void
}>()

const props = defineProps<{
  reservation: Reservation
}>()

function confirmCancel() {
  confirming.value = false
  emit('cancel', props.reservation)
}

function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
