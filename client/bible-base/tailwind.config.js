/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B85FF", // Custom primary color
        secondary: "#EF863E", // Custom secondary color
      },
    },
  },
  plugins: [],
};
