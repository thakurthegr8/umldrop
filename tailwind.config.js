/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0a85d1",
        secondary: "#eaff96",
        general: "#0d121d",
        dark_secondary: "#253141",
      },
    },
  },
  plugins: [],
};
