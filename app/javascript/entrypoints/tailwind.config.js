/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/views/**/*.{erb,html}",
    "./app/javascript/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["MonaSans", "system-ui", "sans-serif"],
    },
    extend: {
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-in-out",
        "bounce-light": "bounceLight 1s infinite",
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
