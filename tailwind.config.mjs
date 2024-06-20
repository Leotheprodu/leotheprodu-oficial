const { nextui } = require('@nextui-org/react');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        code: ['JetBrainsMonoNL'],
        geist: ['Geist-Regular'],
      },
      colors: {
        primario: '#000000',
        secundario: '#0ab7fb',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
