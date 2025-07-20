<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl font-bold mb-8">{{ $t('account') }}</h1>

    <div class="size-full flex flex-col items-center gap-16">
      <FormFullAccountInfos />
      <FormFullAccountPassword />
    </div>
  </div>
</template>
