<template>
  <UHeader>
    <template #title>
      <p class="font-anto text-3xl">Event0</p>
    </template>

    <template #right>
      <UNavigationMenu :items="items" class="hidden md:flex" />
      <div v-if="loggedIn" class="flex items-center gap-2">
        <UButton
          @click="authStore.logout"
          variant="ghost"
          size="sm"
          class="hidden md:block"
          >Log out</UButton
        >
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      <div v-if="loggedIn" class="flex items-center gap-2">
        <UButton
          @click="authStore.logout"
          variant="ghost"
          size="sm"
          class="px-0 py-2"
          >Log out</UButton
        >
      </div>
    </template>
  </UHeader>
</template>

<script setup>
import { useAuthStore } from "@/stores/user";
const { loggedIn, user } = useUserSession();
const authStore = useAuthStore();

const items = computed(() => {
  const baseItems = [
    {
      label: "Home",
      to: "/",
      active: false,
    },
  ];

  baseItems.push(
    loggedIn.value
      ? {
          label: "Events",
          to: "/events/create-event",
          active: false,
        }
      : {
          label: "Sign up/Log in",
          to: "/auth/sign-up",
          active: false,
        },
  );

  return baseItems;
});

onMounted(async () => {
  if (loggedIn.value) {
    authStore.login(user.value);
  }
});
</script>
