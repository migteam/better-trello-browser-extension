/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ["class", '[data-color-mode="dark"]'],
  content: ["**/*.html", "**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
