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
        '@pinia/nuxt',
    ],
    image: {
        screens: { sm: 200, md: 400 } as Record<string, number>,
    },
})
