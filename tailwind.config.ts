import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        inputShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
} satisfies Config;
