const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-source-sans)", ...defaultTheme.fontFamily.serif],
        inter: ["var(--font-inter)"],
        "work-sans": ["var(--font-work-sans)"],
        "playfair-display": [
          "var(--font-playfair-display)",
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
