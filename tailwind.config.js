/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['flex-center'],

  theme: {
    screens: {
      xs: '480px', // extra small
      sm: '640px', // small devices
      md: '768px', // mid small
      lg: '1024px', // larger small
      xl: '1280px', // max breakpoint
      '2xl': '1536px',
    },

    extend: {
      animation: {
        showContent: 'showContent 0.5s ease-in-out forwards',
      },
      colors: {
        blue: '#2997FF',
        gray: {
          DEFAULT: '#86868b',
          100: '#94928d',
          200: '#afafaf',
          300: '#42424570',
        },
        zinc: '#101010',
      },
    },
  },
  plugins: [],
};
