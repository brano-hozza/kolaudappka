import { defineNuxtModule } from '@nuxt/kit'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/scss/main.scss'],

    modules: [
        '@kevinmarrec/nuxt-pwa',
        defineNuxtModule({
            setup(_, nuxt) {
                nuxt.hook('prepare:types', ({ tsConfig }) => {
                    // @ts-ignore
                    tsConfig.compilerOptions.paths['#pwa'] = [
                        './.nuxt/types/pwa',
                    ]
                })
            },
        }),
        '@nuxtjs/tailwindcss',
        '@nuxtjs/eslint-module',
        'nuxt-icon',
        '@nuxt/image',
    ],
    image: {
        screens: [200, 400],
    },
})
