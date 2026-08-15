export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  ssr: true,
  modules: ["@nuxt/eslint"],
  css: ["~/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/variables" as *;',
        },
      },
    },
  },
});
