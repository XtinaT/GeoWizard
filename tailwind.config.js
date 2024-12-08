/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "linear-gradient(90deg, #051717, #265C61)",
      },
      colors: {
        "brand-green": "#48CDAF",
        "brand-grey": "#657677",
        error: "#FF4D4D",
        "btn-bg": "#051717",
      },
      fontSize: {
        8: "0.5rem",
        10: "0.625rem",
        12: "0.75rem",
        13: "0.813rem",
        14: "0.875rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        22: "1.375rem",
        24: "1.5rem",
        26: "1.625rem",
        28: "1.75rem",
        30: "1.875rem",
        32: "2rem",
        36: "2.25rem",
      },
    },
  },
  plugins: [],
};
