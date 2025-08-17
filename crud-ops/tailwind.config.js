/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        secondary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
        },
      },
    },
  },
  plugins: [],
};
