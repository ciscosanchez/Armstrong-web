import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Armstrong Brand Colors — Brand Guidelines §3.6
        armstrong: {
          'dark-blue': '#00263F',
          blue: '#00a4eb',
          'light-blue': '#9ad7f9',
          'grey-1': '#69829e',
          'grey-2': '#9eaec0',
          'grey-3': '#d2dae2',
          'purple-1': '#3d3d5f',
          'purple-2': '#878cbe',
          'purple-3': '#dbdceb',
          'green-1': '#00bc82',
          'green-2': '#7fe1b0',
          'green-3': '#d9f6e7',
        },
      },
      fontFamily: {
        sans: ['var(--font-uncut-sans)', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        // Brand Guidelines §3.11: 100%–140% of point size
        tight: '1.0',
        snug: '1.2',
        relaxed: '1.4',
      },
      // Brand-consistent spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
