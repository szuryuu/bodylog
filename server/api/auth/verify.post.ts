export default defineEventHandler((event) => {
  const password = getRequestHeader(event, "X-App-Password");
  const validPassword = useRuntimeConfig().appPassword;

  if (password !== validPassword) {
    throw createError({
      statusCode: 401,
      message: "Invalid password",
    });
  }

  return { success: true };
});
