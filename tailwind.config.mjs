/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'asee-blue': '#00A3E0',
        'asee-dark': '#003366',
        'asee-light': '#E6F3FF'
      }
    },
  },
  plugins: [],
}
