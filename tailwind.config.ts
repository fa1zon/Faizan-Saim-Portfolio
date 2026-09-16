import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f2f2f2",
        paper: "#121212",
        muted: "#6b6b6b",
        surface: "rgba(18,18,18,0.05)",
        line: "rgba(18,18,18,0.12)",
        glass: "rgba(242,242,242,0.6)",
        "glass-strong": "rgba(242,242,242,0.85)",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "system-ui", "sans-serif"],
        body: ["var(--font-oswald)", "system-ui", "sans-serif"],
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
