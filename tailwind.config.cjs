const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
        inter: ["Inter"],
        "helvetica-neue": ["Helvetica Neue"],
        "playfair-display": [
          "Playfair Display",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        "gray-600": "#282A36",
        "gray-700": "#222232",
        "gray-800": "#1D1E26",
        "gray-900": "#15171B",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
