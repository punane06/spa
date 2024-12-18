import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        highlightColor: '#14cc76',
        textColor: '#3a3d57',
        alternateTextColor: '#fff',
        secondaryColor: '#ff57a2',
        backgroundColor: '#3a3d57',
        linkHoverColor: '#03875c',
        blockColor: '#efefef',
      },
      screens: {
        'md': '620px',
        'xl': '1000px',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif'],
        booster: ['var(--font-booster)', 'sans-serif'],
      },
      backgroundImage: {
        'left-gb': "url('/bg-deco-left.svg')",
        'right-gb': "url('/bg-deco-right.png')",
      }
    },
  },
  plugins: [],
} satisfies Config;
