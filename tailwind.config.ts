import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   
    screens: {
      'sm': '375px',
      'ns': '500px',
      'md': '600px',
      'ml': '900px',
      'lg': '950px',
      'xl': '1240px'
    },

    extend: {
      colors: {
        "darkNavy": "#261676",
        "transparent_darkNavy": "#261676a2",
        "blue": "#2463FF",
        "pink": "#FE71FE",
        "plainBlue": "#7199FF",
        "borderColor": "#243041",
        "headerBorder": "#140E66",
        "hoverBtn": "#5B8AFF"
      },
      backgroundImage: {
        "main": "url('/assets/desktop.svg')",

      },
    },
  },
  plugins: [],
};
export default config;
