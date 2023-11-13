/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: { 
      colors: {
        current: 'currentColor',
        'gray-blue': '#62738d',
        'dark-blue': '#203b5c',
      },
      fontFamily: {
        'primary': ['Barlow Semi Condensed', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.15) 40%, rgba(255, 255, 255, 0.10) 40%, rgba(255, 255, 255, 0.10) 55%, rgba(255, 255, 255, 0.05) 55%)',
      },
    },
  },
  plugins: [],
}

