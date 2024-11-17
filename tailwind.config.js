// const { poppins, lora } = require("@/app/fonts/font");
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        lora: ['var(--font-lora)'],
      },
      colors: {
        bluegreen: {
          90: "#16262E",
          80: "#2E4756",
          75: "#476D85",
          70: "#3C7A89",
          60: "#55A1B4",
          1: "#8EC0CD",
        },
        gray: {
          70: "#65697B",
          60: "#65697B",
          30: "#9FA2B2",
          20: "#C7C9D1",
          10: "#DDDEE3",
        },
        pink: {
          50: "#A26787",
          30: "#AA7490",
          20: "#C19AAE",
          10: "#DBC2CF",
          1: "#D0B3C2",
        },
        white: {
          1: "#F8F8FF",
        }
      },
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
}

