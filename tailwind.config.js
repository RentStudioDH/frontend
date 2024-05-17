/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Lato', 'sans-serif'], // Utiliza 'Lato' como la fuente sans-serif por defecto
    },
  },
  plugins: [],
}