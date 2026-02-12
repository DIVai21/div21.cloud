import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06011E",
        secondary: "#0E013C",
        accent: "#19048D",
        highlight: "#3700FF",
        warning: "#00FFDD",
        success: "#19FF00",
        background: "#F8F9FA",
        surface: "#FFFFFF",
      },
      fontFamily: {
        tomorrow: ["var(--font-tomorrow)", "sans-serif"],
        "source-code": ["var(--font-source-code)", "monospace"],
        "roboto-flex": ["var(--font-roboto-flex)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
