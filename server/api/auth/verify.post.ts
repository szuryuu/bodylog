export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password = body?.password;
  
  const validPassword = useRuntimeConfig().appPassword;

  if (!password || String(password) !== String(validPassword)) {
    throw createError({
      statusCode: 401,
      message: "Invalid password",
    });
  }

  return { success: true };
});
