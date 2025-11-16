/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1d2d44",
          hover: "#253b57",
          border: "#1d2d44",
        },
        secondary: {
          DEFAULT: "#f0ebd8",
          hover: "#e4dcc5",
          border: "#f0ebd8",
        },
        success: {
          DEFAULT: "#008000",
          hover: "#006600",
          border: "#008000",
        },
        danger: {
          DEFAULT: "#a12422",
          hover: "#821c1a",
          border: "#a12422",
        },
      },

      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.6vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8vw, 1rem)",
        "fluid-base": "clamp(1rem, 1vw, 1.25rem)",
        "fluid-lg": "clamp(1.25rem, 1.8vw, 1.75rem)",
        "fluid-xl": "clamp(1.5rem, 2.5vw, 2.25rem)",
        "fluid-2xl": "clamp(2rem, 3vw, 3rem)",
      },
    },
  },
  plugins: [],
};
