/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1e2a3a',
        'input-bg': '#273142',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(-40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-15%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'bounce-in': 'bounce 0.6s ease-out',
      },
    },
  },
  plugins: [require('daisyui')],
};
