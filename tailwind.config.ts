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
        tomorrow: ["Tomorrow", "sans-serif"],
        "source-code": ["Source Code Pro", "monospace"],
        "roboto-flex": ["Roboto Flex", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
