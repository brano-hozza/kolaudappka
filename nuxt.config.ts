// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-07-16",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/_colors.scss" as *;',
        },
      },
    },
  },
  css: ["~/assets/styles/main.scss"],

  modules: ["@nuxtjs/tailwindcss", "@nuxt/eslint", "@nuxt/icon", "@nuxt/image"],
  buildModules: ["@nuxtjs/pwa"],
});
