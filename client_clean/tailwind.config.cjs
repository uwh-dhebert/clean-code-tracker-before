/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Add custom colors here, but keep default colors
                ...defaultTheme.colors,
            },
        },
    },
    plugins: [],
};