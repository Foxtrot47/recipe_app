const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Source Serif Pro', ...defaultTheme.fontFamily.serif],
        'sans': ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'accent': '#ff4a52',
      }
    },
  },
  plugins: [],
}
