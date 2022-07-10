/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#8ECAE6',

          secondary: '#219EBC',

          accent: '#023047',

          neutral: '#F1FAEE',

          'base-100': '#FFFFFF',

          info: '#FFB703',

          success: '#6ADC7F',

          warning: '#EFD8BD',

          error: '#FB8500',
        },
      },
    ],
  },

  plugins: [require('daisyui')],
};
