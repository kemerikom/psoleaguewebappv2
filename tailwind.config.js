/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage:{
        'stadium':"url(/stadium.png)"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
