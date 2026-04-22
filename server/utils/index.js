export const checkUserSession = async (event) => {
  if (!event.context?.auth?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  return event.context.auth.user;
};
