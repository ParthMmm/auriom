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
        parp: {
          DEFAULT: "#D013F6",
          50: "#F3C4FD",
          100: "#EFB0FC",
          200: "#E789FA",
          300: "#E062F9",
          400: "#D83AF7",
          500: "#D013F6",
          600: "#A908C9",
          700: "#7B0693",
          800: "#4E045D",
          900: "#210127",
        },
      },
      fontFamily: {
        ObjectSans: ["Object Sans", "sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
