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
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: {
          DEFAULT: "#f1ead8",
          deep: "#e9dfc6",
          fold: "#dccfae",
        },
        ink: {
          DEFAULT: "#171413",
          soft: "#3a342f",
          mute: "#6b6359",
          faint: "#9b8f7e",
        },
        vermilion: {
          DEFAULT: "#d64a1f",
          deep: "#a93612",
          ink: "#7a2810",
        },
        ochre: "#b8862c",
        sage: "#5d6b4a",
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.025em",
        loose: "0.06em",
        wider: "0.12em",
        widest: "0.22em",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        drawLine: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        stampIn: {
          "0%": { opacity: "0", transform: "rotate(-8deg) scale(1.4)" },
          "70%": { opacity: "1" },
          "100%": { opacity: "0.85", transform: "rotate(-8deg) scale(1)" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        blink: "blink 1.05s steps(2, end) infinite",
        drawLine: "drawLine 1.1s cubic-bezier(0.7, 0, 0.3, 1) forwards",
        riseIn: "riseIn 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        stampIn: "stampIn 0.7s cubic-bezier(0.2, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
