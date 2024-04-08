/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
        heebo: ['Heebo'],
        poppins: ['Poppins'],
      },
      height: {
        '440px': '440px',
      },
      width: {
        '350px': '350px',
      },
    },
  },
  plugins: [],
};
