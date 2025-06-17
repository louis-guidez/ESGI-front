<template>
  <div class="min-h-screen bg-gray-50 pb-20 p-4 flex items-center justify-center">
    <div class="w-full max-w-2xl space-y-4">
      <h1 class="text-2xl font-semibold">Recherche</h1>
      <div class="bg-white rounded shadow p-4 flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Rechercher..."
          class="flex-grow rounded border px-3 py-2"
        />
        <button class="rounded bg-blue-600 px-4 py-2 text-white">Chercher</button>
      </div>
    </div>
  </div>
</template>
