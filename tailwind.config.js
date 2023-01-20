/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  important:true,
  theme: {
    extend: {
      backgroundImage:{
        'stadium':"url(/stadium.png)"
      },
      aspectRatio:{
        'stadium':'9 / 12',
        'sixbox':'12 / 7'
      },
      colors:{
        'gold':'#ffd700'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}
