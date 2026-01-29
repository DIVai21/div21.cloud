/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dv21: {
          background: "#06011e",
          logo: "#66cd00",
          accent: "#3700FF",
          cyan: "#00FFDD",
          navy: "#19048D",
          dark: "#06011E",
        },
      },
    },
  },
  plugins: [],
};
