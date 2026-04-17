<template>
  <UHeader>
    <template #title>
      <p class="font-anto text-3xl">Event0</p>
    </template>

    <template #right>
      <UNavigationMenu :items="items" class="hidden md:flex"/>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<script setup>
const items = computed(() => {
  const baseItems = [
    {
      label: "Home",
      to: "/",
      active: false,
    },
  ];

  baseItems.push(
    {
      label: "Events",
      to: "/events/create-event",
      active: false,
    },
    {
      label: "Sign up/Log in",
      to: "/auth/sign-up",
      active: false,
    },
  );

  return baseItems;
});
</script>
