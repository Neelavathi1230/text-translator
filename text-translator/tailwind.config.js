/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
      },
      colors: {
        ink: '#1B1B3A',
        paper: '#EEF1F6',
        card: '#FFFFFF',
        muted: '#5B5F76',
        marigold: {
          DEFAULT: '#E8A33D',
          soft: '#F6D9A8',
        },
        jade: {
          DEFAULT: '#1F9D8A',
          soft: '#CFEDE7',
        },
        dusk: {
          bg: '#14152B',
          card: '#1E2044',
          border: '#2E3060',
          text: '#E7E7F2',
          muted: '#9A9CC0',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(27, 27, 58, 0.25)',
        card: '0 1px 2px rgba(27, 27, 58, 0.06), 0 8px 24px -8px rgba(27, 27, 58, 0.12)',
      },
      keyframes: {
        seam: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px) translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
        },
      },
      animation: {
        seam: 'seam 6s ease infinite',
        fadeUp: 'fadeUp 0.35s ease both',
        toastIn: 'toastIn 0.25s ease both',
      },
    },
  },
  plugins: [],
}
