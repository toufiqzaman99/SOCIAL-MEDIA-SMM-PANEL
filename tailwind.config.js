/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0b14',
          950: '#05050a',
          900: '#0b0b14',
          800: '#12121e',
          700: '#1a1a2b',
          600: '#232338',
        },
        brand: {
          50: '#f3efff',
          100: '#e9e2ff',
          200: '#d5c8ff',
          300: '#b8a1ff',
          400: '#9a72ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Helvetica Now Display Bold"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(124, 58, 237, 0.55)',
        'glow-sm': '0 0 28px -8px rgba(124, 58, 237, 0.5)',
        card: '0 24px 60px -24px rgba(0, 0, 0, 0.65)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.8s infinite',
      },
    },
  },
  plugins: [],
}
