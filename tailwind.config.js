/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: '#F5F7F8',
        foreground: '#2C3E50',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#2C3E50',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#2C3E50',
        },
        primary: {
          DEFAULT: '#89A8B2',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#B2D8D8',
          foreground: '#2C3E50',
        },
        muted: {
          DEFAULT: '#F5F7F8',
          foreground: '#2C3E50',
        },
        accent: {
          DEFAULT: '#5D7A8C',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#e74c3c',
          foreground: '#ffffff',
        },
        text: {
          DEFAULT: '#ffffff',
          foreground: '#2C3E50',
        },
        border: '#dcdfe1',
        input: '#89A8B2',
        ring: '#89A8B2',
        chart: {
          1: '#89A8B2',
          2: '#B2D8D8',
          3: '#5D7A8C',
          4: '#2C3E50',
          5: '#F5F7F8',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
