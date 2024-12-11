/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          200: '#FFEAA7',
          400: '#FFD700',
          600: '#FFC107',
        },
      },
    },
  },
  plugins: [],
};
