import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"General Sans"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
    colors: {
      frost: {
        DEFAULT: '#5C5C5C',
        100: '#F5F5F5',
        200: '#DEDEFF',
        300: '#EBEBEB',
        400: '#C2C2C2',
        900: '#333333',
      },
      twilight: {
        DEFAULT: '#3F51B5',
        light: '#757DE8',
      },
      blossom: {
        DEFAULT: '#FF4081',
        light: '#FFE4FF',
      },
    },
    container: {
      center: true,
      padding: '1rem',

      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
      },
    },
  },
  plugins: [],
} satisfies Config;
