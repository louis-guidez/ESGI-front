<template>
  <div class="min-h-screen bg-gray-50 pb-20 p-4 flex items-center justify-center">
    <div class="w-full max-w-2xl space-y-4">
      <h1 class="text-2xl font-semibold">Mes favoris</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-white rounded shadow p-4 flex flex-col items-center justify-center">
          <p class="text-gray-500 text-center">Aucun favori pour le moment.</p>
          <NuxtLink
            to="/search"
            class="mt-4 inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-white"
          >
            Découvrir des annonces
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
