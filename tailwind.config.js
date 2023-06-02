/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
};
