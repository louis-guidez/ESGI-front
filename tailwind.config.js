/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app.vue', './components/**/*.{vue,js,ts}', './layouts/**/*.{vue,js,ts}', './pages/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3a7ca5',
          DEFAULT: '#2a4d69',
          dark: '#1e3750',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
