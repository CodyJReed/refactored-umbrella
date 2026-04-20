<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md p-6">
      <h1 class="font-anton text-center mb-6 text-5xl">
        {{ type === "sign-up" ? "Sign up" : "Sign in" }}
      </h1>

      <UForm :state="formData" @submit="onSubmit" class="space-y-4" :schema="schema">
        <UFormField label="email" name="email">
          <UInput v-model="formData.email" class="w-full" />
        </UFormField>

        <UFormField label="password" name="password">
          <UInput v-model="formData.password" type="password" class="w-full" />
        </UFormField>

        <UButton
          type="button"
          trailing-icon="i-lucide-arrow-left"
          variant="text"
          color="grey"
          @click="navigateTo('/')"
          class="cursor-pointer"
        >
          Go back
        </UButton>
        <UButton type="submit" trailing-icon="i-lucide-arrow-right" :loading>
          {{ type === "sign-up" ? "Sign up" : "Sign in" }}
        </UButton>

        <USeparator />

        <UButton
          trailing-icon="mdi:account-alert-outline"
          variant="ghost"
          color="info"
          @click="type = type === 'sign-up' ? 'sign-in' : 'sign-up'"
          class="cursor-pointer"
        >
          {{ type === "sign-up" ? "I wnat to sign in" : "I want to sign up" }}
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { signUpHelper } from "~/composables/signUpHelper";

const type = ref("sign-up");
const loading = ref(false);
const formData = reactive({
  email: "cody@test.com",
  password: "abc123",
});

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

async function onSubmit(event) {
  event.preventDefault();
  loading.value = true;

  try{
    await signUpHelper(formData, type.value)
  }catch(error) {

  }finally{
    loading.value = false; 
  }
}

definePageMeta({
  layout: "auth",
});
</script>
