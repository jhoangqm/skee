/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*',
  ],
  theme: {
    sm: '640px',
    // => @media (min-width: 640px) { ... }

    md: '768px',
    // => @media (min-width: 768px) { ... }

    lg: '1024px',
    // => @media (min-width: 1024px) { ... }

    xl: '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1440px',
    // => @media (min-width: 1440px) { ... }

    '3xl': '1536px',
    // => @media (min-width: 1536px) { ... }
    extend: {
      boxShadow: {
        custom: '1px 1px 6px 2px #D5D5D5',
      },
    },
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
