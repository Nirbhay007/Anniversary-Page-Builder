/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)'],
                playfair: ['var(--font-playfair)'],
                lato: ['var(--font-lato)'],
                'great-vibes': ['var(--font-great-vibes)'],
            },
        },
    },
    plugins: [],
}
