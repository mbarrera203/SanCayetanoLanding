export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#211F1D',
          700: '#3A3733',
          500: '#6B655E',
          400: '#8C867E',
          300: '#B7B1A9',
        },
        sand: {
          50: '#FBF8F4',
          100: '#F5F0E9',
          200: '#E9E2D7',
          300: '#D8CFC1',
        },
        terracotta: {
          DEFAULT: '#7A2E22',
          50: '#FAF1EE',
          100: '#F1DBD4',
          200: '#E0B8AC',
          400: '#A9503E',
          500: '#8A3626',
          600: '#6A2A1F',
          700: '#54211A',
        },
        mp: {
          DEFAULT: '#009EE3',
          dark: '#0086C3',
          ink: '#2D3277',
          yellow: '#FFE600',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(33,31,29,0.04), 0 10px 26px -14px rgba(33,31,29,0.14)',
        lift: '0 2px 6px rgba(33,31,29,0.05), 0 24px 48px -20px rgba(33,31,29,0.22)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
