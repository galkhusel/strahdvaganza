/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        script:['Dancing Script']
      },
      colors: {
        "dark-purple": "#4a004b",
        "blood-red": "#8b0000",
        "elegant-black": "#0b0c10",
        "mysterious-gray": "#2b2d42",
        "dusty-rose": "#d90429"
      }
    }
  },
  plugins: [],
}

