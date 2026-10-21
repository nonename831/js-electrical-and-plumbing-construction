/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Inter for Latin; explicit CJK fallbacks so Chinese renders consistently across OSes
      fontFamily: { sans: ['Inter', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Noto Sans SC"', 'sans-serif'] },
      colors: {
        brand: {
          dark: '#0a3d62',
          // blue/green darkened from #1e88e5/#25D366 so white text meets WCAG contrast
          blue: '#1976d2',
          cyan: '#26c6da',
          green: '#1a9e4b',
          greenHover: '#168a41',
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
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease 0.1s both',
        'fade-in-down': 'fadeInDown 0.4s ease both',
        'badge-pop': 'badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        // Built-in ping, but only 3 pulses instead of looping forever
        'ping-few': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) 1s 3 both',
      },
    },
  },
  plugins: [],
};
