import type { Config } from "tailwindcss";

const config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Refinamento direto da identidade de OLD: #FCFAF7, #3E4D2C,
        // #6B7959, #91A082, #A99960 e #F9F5EF.
        canvas: {
          DEFAULT: "#F7F4EE",
          soft: "#EEE9DF",
          warm: "#F9F5EF",
        },
        ink: {
          DEFAULT: "#1E261F",
          muted: "#5F665F",
          soft: "#7A8079",
        },
        forest: {
          DEFAULT: "#29392D",
          deep: "#1C2A20",
          original: "#3E4D2C",
        },
        moss: {
          DEFAULT: "#627052",
          light: "#7E8A70",
          original: "#6B7959",
        },
        sage: {
          DEFAULT: "#9AA38E",
          pale: "#DCE1D5",
          original: "#91A082",
        },
        gold: {
          DEFAULT: "#A08A58",
          soft: "#C9B990",
          original: "#A99960",
        },
        line: {
          DEFAULT: "#D8D1C5",
          strong: "#BFB6A8",
        },
        whatsapp: {
          DEFAULT: "#1F7A4D",
          hover: "#165F3A",
        },
        // Papéis semânticos alternados pelo tema. As cores da marca acima
        // permanecem estáveis; superfícies e conteúdo mudam sem inverter fotos.
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          soft: "rgb(var(--surface-soft) / <alpha-value>)",
          warm: "rgb(var(--surface-warm) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
          contrast: "rgb(var(--surface-contrast) / <alpha-value>)",
        },
        content: {
          DEFAULT: "rgb(var(--content) / <alpha-value>)",
          muted: "rgb(var(--content-muted) / <alpha-value>)",
          subtle: "rgb(var(--content-subtle) / <alpha-value>)",
          onContrast: "rgb(var(--content-on-contrast) / <alpha-value>)",
          onLight: "rgb(var(--content-on-light) / <alpha-value>)",
        },
        stroke: {
          DEFAULT: "rgb(var(--stroke) / <alpha-value>)",
          strong: "rgb(var(--stroke-strong) / <alpha-value>)",
          onContrast: "rgb(var(--stroke-on-contrast) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          text: "rgb(var(--accent-text) / <alpha-value>)",
        },
        highlight: "rgb(var(--highlight) / <alpha-value>)",
        petal: "rgb(var(--petal) / <alpha-value>)",
      },
      fontFamily: {
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["clamp(2.75rem, 11vw, 4.5rem)", { lineHeight: "0.94", letterSpacing: "-0.045em" }],
        display: ["clamp(4rem, 7.2vw, 7.5rem)", { lineHeight: "0.88", letterSpacing: "-0.05em" }],
        "section-sm": ["clamp(2.4rem, 10vw, 4.25rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        section: ["clamp(3rem, 5vw, 5.5rem)", { lineHeight: "0.94", letterSpacing: "-0.04em" }],
      },
      maxWidth: {
        frame: "90rem",
        copy: "42rem",
      },
      borderRadius: {
        organic: "2.5rem 0.5rem 2.5rem 0.5rem",
      },
      boxShadow: {
        soft: "0 24px 70px -38px rgba(28, 42, 32, 0.32)",
        lift: "0 32px 90px -45px rgba(28, 42, 32, 0.4)",
      },
      transitionTimingFunction: {
        organic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(1.25rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "soft-scale": {
          from: { opacity: "0", transform: "scale(1.025)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "soft-scale": "soft-scale 1200ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
