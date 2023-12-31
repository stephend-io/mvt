/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: 'lores-9-wide-bold-alt-oaklan',
        kabel: 'neue-kabel',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        secondary2: 'var(--secondary2)',
        secondary3: 'var(--secondary3)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
      },
      backgroundColor: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        secondary2: 'var(--secondary2)',
        secondary3: 'var(--secondary3)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
      },
      textColor: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        secondary2: 'var(--secondary2)',
        secondary3: 'var(--secondary3)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
      },
      fill: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        secondary2: 'var(--secondary2)',
        secondary3: 'var(--secondary3)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
      },
      boxShadow: {
        '3xl': '10px 35px 20px -15px rgba(0, 0, 0, 0.6)',
      },
    },
  },

  plugins: ['prettier-plugin-tailwindcss'],

  safelist: ['bg-primary', 'bg-[--primary]'],
}
