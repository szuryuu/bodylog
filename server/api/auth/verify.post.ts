export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const password = body?.password;
  
  const validPassword = useRuntimeConfig().appPassword;

  // console.log("Login Attempt:", { input: password, config: validPassword });

  if (!password || String(password) !== String(validPassword)) {
    throw createError({
      statusCode: 401,
      message: "Invalid password",
    });
  }

  return { success: true };
});
