module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'ttable': '4rem repeat(6, minmax(0, 1fr));',
      },
      gridTemplateColumns: {
        'ttable': '4rem repeat(6, minmax(0, 1fr));',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
