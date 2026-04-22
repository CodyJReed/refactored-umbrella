<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md p-6">
      <h1 class="font-anton text-left mb-6 text-5xl">Create Event</h1>
      <UForm
        :schema="schema"
        :state="formData"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Title" name="title">
          <UInput v-model="formData.title" class="w-full" placeholder="Title" />
        </UFormField>
        <UFormField label="Content" name="content">
          <UTextarea
            autoresize
            v-model="formData.content"
            class="w-full"
            placeholder="Lorem Ipsum"
          />
        </UFormField>
        <UPopover>
          <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">{{
            formData.date
              ? format(formData.date, "d MMM, yyyy")
              : "Select a date"
          }}</UButton>
          <template #content>
            <UCalendar class="p-2" v-model="formData.date" />
          </template>
        </UPopover>
        <UButton type="submit" :loading="loading" class="w-full" size="lg"
          >Create event</UButton
        >
      </UForm>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { format } from "date-fns";
const toast = useToast();

const loading = ref(false);
const errors = ref([]);
const formData = reactive({
  title: "",
  content: "",
  date: null,
});

const schema = yup.object({
  title: yup.string().required("Title is required."),
  content: yup.string().required("Text is required."),
});

async function onSubmit(event) {
  event.preventDefault();
  loading.value = true;

  try {
    await useFetch("/api/events/event", {
      method: "POST",
      body: formData,
    });

    toast.add({
      title: "Great!!",
      description: "Event created!",
      color: "success",
    });
    await navigateTo("/");
  } catch (error) {
  } finally {
    loading.value = false;
  }
}

definePageMeta({
  middleware: ["auth-guard"],
});
</script>
