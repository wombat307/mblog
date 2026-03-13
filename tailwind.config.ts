import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "serif"],
      },
      colors: {
        ink: {
          50: "#f7f6f4",
          100: "#ebe9e4",
          200: "#d6d2ca",
          300: "#b8b2a4",
          400: "#9a9282",
          500: "#7f7668",
          600: "#6b6358",
          700: "#58514a",
          800: "#4a453f",
          900: "#3f3b36",
          950: "#272522",
        },
        accent: {
          DEFAULT: "#c45c3e",
          light: "#e07d5f",
          dark: "#9e4329",
        },
      },
    },
  },
  plugins: [],
};

export default config;
