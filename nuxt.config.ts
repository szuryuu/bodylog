import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["./app/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },

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
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "nuxt-lucide-icons"],

  googleFonts: {
    families: {
      Syne: [400, 500, 600, 700, 800],
      Mynerve: [400],
      "Courier+New": [400, 700],
    },
    display: "swap",
  },

  runtimeConfig: {
    appPassword: process.env.APP_PASSWORD,
    googleServiceAccount: {
      projectId: process.env.GOOGLE_PROJECT_ID,
      privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    },
    spreadsheetId: process.env.SPREADSHEET_ID,
  },

  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
});
