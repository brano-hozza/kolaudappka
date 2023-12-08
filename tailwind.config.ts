/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
        extend: {
            colors: {
                pinky: '#F752E0',
                delete: '#ff3a4e',
            },
        },
        fontFamily: {
            basic: ['Nickainley'],
        },
    },
    plugins: [],
    safelist: [
        'text-red-500',
        'text-green-500',
        'text-blue-500',
        'text-yellow-500',
        'text-pink-500',
        'text-purple-500',
        {
            pattern: /text-\[.*\]/,
        },
    ],
}
