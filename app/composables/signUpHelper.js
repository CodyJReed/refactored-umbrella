import { useAuthStore } from "#imports";

export const signUpHelper = async (formData, type) => {
  const { fetch: refreshSession } = useUserSession();
  const toast = useToast();
  const authStore = useAuthStore()
  let response;

  try {
    if (type === "sign-up") {
      response = await $fetch("/api/auth/sign-up", {
        method: "POST",
        body: formData,
      });
    } else {
      response = await $fetch('/api/auth/sign-in', {
        method: 'POST',
        body: formData
      })
    }
    
    // Pinia
    authStore.login(response.user)
    toast.add({
      title: "Congrats",
      description: "Welcome!",
      color: "success",
    });
    await refreshSession();
    await navigateTo("/");

    return true;
  } catch (error) {
    if (error.statusCode === 400 && error.data.data) {
      const validationErrors = error.data.data.errorsArray;

      validationErrors.forEach((error) =>
        toast.add({
          title: "Oops",
          description: error,
          color: "error",
        }),
      );
    } else {
      toast.add({
        title: "Oops",
        description: error.data?.statusMessage || "Sorry something happened.",
        color: "error",
      });
    }

    return false;
  }
};
