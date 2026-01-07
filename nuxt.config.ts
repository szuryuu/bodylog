import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["./app/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },

  runtimeConfig: {
    googleServiceAccount: {
      projectId: process.env.GOOGLE_PROJECT_ID,
      privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    },
    spreadsheetId: process.env.SPREADSHEET_ID,
  },

  app: {
    head: {
      title: "V-Shape Tracker",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  devtools: { enabled: true },
  modules: ["@nuxt/ui"],

  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
});
