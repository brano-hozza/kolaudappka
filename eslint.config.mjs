import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-empty': 'error',
        'vue/html-self-closing': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        '@typescript-eslint/unified-signatures': 'off',
    },
})
