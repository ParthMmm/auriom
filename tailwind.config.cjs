/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        harlequin: {
          DEFAULT: "#3AF613",
          50: "#CEFDC4",
          100: "#BDFCB0",
          200: "#9CFA89",
          300: "#7CF962",
          400: "#5BF73A",
          500: "#3AF613",
          600: "#29C908",
          700: "#1E9306",
          800: "#135D04",
          900: "#082701",
        },
      },
      fontFamily: {
        ObjectSans: ["Object Sans", "sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
