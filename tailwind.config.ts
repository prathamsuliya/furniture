import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        linen: {
          50:  '#FDFAF6',
          100: '#F8F3EC',
          200: '#F2E9DC',
          300: '#E8DDD0',
          400: '#D9CABА',
          500: '#C8B89A',
          600: '#A89070',
          700: '#8A7055',
          800: '#6B5B4E',
          900: '#4A3F36',
        },
        warm: {
          white: '#FDFAF6',
          beige: '#F5F0EB',
          sand:  '#E8E0D5',
          taupe: '#C8B89A',
          mocha: '#8A7055',
          espresso: '#4A3F36',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'fade-in':    'fade-in 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%':       { transform: 'scale(1.25)', opacity: '0.3' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
