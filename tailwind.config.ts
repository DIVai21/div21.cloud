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
        muted: "#6B7280",
      },
      fontFamily: {
        tomorrow: ["var(--font-tomorrow)", "sans-serif"],
        "source-code": ["var(--font-source-code)", "monospace"],
        "roboto-flex": ["var(--font-roboto-flex)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
