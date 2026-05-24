/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B192C",
          gold: "#FFD700",
          dark: "#1A202C",
        }
      }
    },
  },
  plugins: [],
}