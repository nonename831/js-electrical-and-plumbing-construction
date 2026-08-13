/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        brand: {
          dark: '#0a3d62',
          blue: '#1e88e5',
          cyan: '#26c6da',
          green: '#25D366',
          greenHover: '#1ebc59',
        },
      },
    },
  },
  plugins: [],
};
