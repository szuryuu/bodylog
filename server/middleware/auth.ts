export default defineEventHandler((event) => {
  const path = event.path;

  if (
    path === "/" ||
    path.startsWith("/_nuxt") ||
    path.startsWith("/api/gym/get") ||
    path.startsWith("/api/bulk/get") ||
    !path.startsWith("/api/")
  ) {
    return;
  }

  const password = getRequestHeader(event, "X-App-Password");
  const validPassword = useRuntimeConfig().appPassword;

  if (password !== validPassword) {
    throw createError({
      statusCode: 401,
      message: "Invalid password",
    });
  }
});
