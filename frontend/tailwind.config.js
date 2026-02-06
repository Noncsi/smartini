/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';
module.exports = {
  content: ['./projects/**/*.{html,ts}', './libs/**/*.{html,ts}', './src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg) scale(1)' },
          '50%': { transform: 'rotate(1deg) scale(1.04)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.2)' },
          '100%': { transform: 'scale(1)' },
        },
        scaleDown: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.2)' },
        },
      },
      animation: {
        wiggle: 'wiggle 4s ease-in-out infinite',
        scaleUp: 'scaleUp 0.2s ease',
        scaleDown: 'scaleDown 0.4s ease',
      },
    },
  },
  plugins: [PrimeUI],
};
