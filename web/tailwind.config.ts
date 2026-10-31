import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        "paper-2": "rgb(var(--paper-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-2": "rgb(var(--ink-2) / <alpha-value>)",
        "ink-3": "rgb(var(--ink-3) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--accent-ink) / <alpha-value>)",
        leaf: "rgb(var(--leaf) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      // 10 / 11 px were used as raw values dozens of times; naming them keeps
      // the mono labels on one scale and makes a size change a one-line edit.
      fontSize: {
        micro: ["0.625rem", { lineHeight: "1.5" }],
        mini: ["0.6875rem", { lineHeight: "1.6" }],
      },
      maxWidth: { content: "1180px" },
    },
  },
  plugins: [],
};

export default config;
