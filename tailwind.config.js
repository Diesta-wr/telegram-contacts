/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tg: {
          blue: '#2AABEE',
          purple: '#8774E1',
          green: '#31B545',
          dark: '#0f0f0f',
          card: '#1f1f1f',
          surface: '#2f2f2f',
          surfaceHover: '#3f3f3f',
          text: '#8e8e8e',
        }
      },
      animation: {
        'float1': 'float1 20s ease-in-out infinite',
        'float2': 'float2 18s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.4s forwards',
        'dash': 'dash 1.5s ease-in-out infinite',
        'dots': 'dots 1.5s steps(4, end) infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(100px, 100px) scale(1.2)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-100px, -100px) scale(1.3)' },
        },
        fadeIn: {
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        dash: {
          '0%': {
            strokeDasharray: '1, 95',
            strokeDashoffset: '0',
          },
          '50%': {
            strokeDasharray: '85, 95',
            strokeDashoffset: '-25',
          },
          '100%': {
            strokeDasharray: '85, 95',
            strokeDashoffset: '-93',
          },
        },
        dots: {
          '0%, 20%': { content: "''" },
          '40%': { content: "'.'" },
          '60%': { content: "'..'" },
          '80%, 100%': { content: "'...'" },
        }
      },
      boxShadow: {
        'glass': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}