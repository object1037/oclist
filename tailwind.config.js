const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'ttable': '8rem repeat(6, minmax(0, 1fr));',
      },
      gridTemplateColumns: {
        'ttable': '4rem repeat(6, minmax(0, 1fr));',
      },
      colors: {
        gray: colors.neutral,
        ppink: {
          200: '#fd2e7a',
          300: '#df286c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'YuGothic', "Yu Gothic Medium", "Yu Gothic", ...fontFamily.sans]
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
