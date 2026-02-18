/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Fulfills the requirement "Set darkMode: 'class' in tailwind.config"
    theme: {
        extend: {},
    },
    plugins: [],
}
