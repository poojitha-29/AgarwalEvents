/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d8',
          500: '#e0485f',
          600: '#c9283d',
          700: '#8B0000',
          800: '#7a0000',
          900: '#660000',
        },
        beige: {
          50: '#fdfcf8',
          100: '#F5F0E8',
          200: '#EDE4D3',
          300: '#DDD0BB',
          400: '#C9B99A',
        },
        gold: {
          400: '#D4AF37',
          500: '#C9A227',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        lato: ['Lato', 'sans-serif'],
        vibes: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
};
