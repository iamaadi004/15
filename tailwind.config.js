/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-primary': '#1a365d',
        'brand-secondary': '#2d3748',
        'brand-accent': '#3182ce',
        'brand-light': '#4a5568',
        'brand-dark': '#1a365d',
        'brand-blue': '#3182ce',
        'brand-background': '#e8f0ff',
        'brand-glass': 'rgba(255, 255, 255, 0.1)',
        'brand-glass-border': 'rgba(255, 255, 255, 0.2)',
        'brand-bg-start': '#e8f0ff',
        'brand-bg-mid': '#d5e5ff',
        'brand-bg-end': '#c2d9ff',
      },
      animation: {
        'slide-up': 'slideUp 1s ease-out forwards',
        'tag-float': 'tagFloat 3s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
            'from': { opacity: 0, transform: 'translateY(50px)' },
            'to': { opacity: 1, transform: 'translateY(0)' },
        },
        tagFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      }
    }
  },
  plugins: [],
};
