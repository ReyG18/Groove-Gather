/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "groove-red": "#9E2A2B",
        "groove-red-hover": "#AE3436",
        "groove-red-active": "#BA383A",
        "groove-neutral": "#D1D1D1"
      },
      grayscale: {
        50: '50%',
      }
    },
  },
  plugins: [],
}

