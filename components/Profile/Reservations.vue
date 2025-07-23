<script setup lang="ts">
// const { locales, setLocale } = useI18n()

const { getReservationsByUser, reservations, deleteReservation } = extractStore(useReservationStore())

onMounted(async () => {
  await getReservationsByUser()
})

async function handleCancel(reservationToDelete) {
  await deleteReservation(reservationToDelete.id)
  await getReservationsByUser()
}
</script>

<template>
  <div class="w-full space-y-4">
    <h2 class="text-xl font-semibold mb-4">Mes Réservations</h2>

    <div v-if="reservations.length === 0" class="text-gray-500">Aucune réservation trouvée.</div>

    <div v-else class="space-y-6">
      <ProfileReservationCard v-for="reservation in reservations" :key="reservation.id" :reservation="reservation" @cancel="handleCancel" />
    </div>
  </div>
</template>
