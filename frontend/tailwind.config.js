/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B7E3C",
        dark: "#0f0f0f",
        card: "#1a1a1a",
      },
    },
  },
  plugins: [],
}