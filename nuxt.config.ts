// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/scss/main.scss'],
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/eslint-module',
        'nuxt-icon',
        '@nuxt/image',
        '@kevinmarrec/nuxt-pwa',
    ],
    image: {
        screens: [200, 400],
    },
})
