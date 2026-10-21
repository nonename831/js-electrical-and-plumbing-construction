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
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        badgePop: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.7)' },
          '60%': { opacity: '1', transform: 'translateY(-6px) scale(1.08)' },
          '80%': { transform: 'translateY(3px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        iconBounce: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.2) rotate(-8deg)' },
          '50%': { transform: 'scale(0.95) rotate(6deg)' },
          '75%': { transform: 'scale(1.1) rotate(-3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease 0.1s both',
        'fade-in-down': 'fadeInDown 0.4s ease both',
        'badge-pop': 'badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'icon-bounce': 'iconBounce 0.5s ease',
      },
    },
  },
  plugins: [],
};
