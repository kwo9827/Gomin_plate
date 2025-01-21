// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          dark: '#FF5252',
          light: '#FF8484'
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          dark: '#45B7AF',
          light: '#65D6CE'
        },
        background: {
          DEFAULT: '#F8F9FA',
          dark: '#343A40'
        }
      },
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
        heading: ['GmarketSans', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}

