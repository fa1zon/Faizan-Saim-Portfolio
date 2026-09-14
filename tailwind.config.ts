import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0e1011",
        paper: "#ffffff",
        muted: "#b5b5b5",
        surface: "rgba(255,255,255,0.05)",
        line: "rgba(255,255,255,0.11)",
        glass: "rgba(12,14,15,0.5)",
        "glass-strong": "rgba(12,14,15,0.7)",
      },
      fontFamily: {
        display: ["Switzer", "Switzer Fallback", "system-ui", "sans-serif"],
        body: ["var(--font-figtree)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "6px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.44, 0, 0.22, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
