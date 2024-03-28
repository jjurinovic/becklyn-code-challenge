import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        50: '#F2FEFF',
        75: '#D6F8FB',
        100: '#BAF3F7',
        200: '#85E9EF',
        300: '#58DEE6',
        400: '#36D1DA',
        500: '#1FC1CA',
        600: '#1AAEB7',
        700: '#109BAA',
        800: '#078699',
        900: '#007187',
      },
      secondary: '#004B44',
      grey: {
        50: '#FFFFFF',
        75: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EAEAEA',
        300: '#E1E1E1',
        400: '#CACACA',
        500: '#B3B3B3',
        600: '#8E8E8E',
        700: '#6E6E6E',
        800: '#4B4B4B',
        900: '#2C2C2C',
      },
    },
  },
  plugins: [],
};

export default config;
