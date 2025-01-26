/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        font_primary: 'rgb(33, 33, 33) ',
        font_secondary: 'rgb(51, 51, 51)',
        font_tertiary: 'rgb(224, 224, 224)',
        font_quaternary: 'rgb(176, 176, 176)',
        primary: 'rgb(224, 74, 70)',
        secondary: 'rgb(99, 78, 74)',
        button: 'rgb(169, 21, 14)',
        footer: 'rgb(26, 26, 26)'

      },
      fontFamily: {
        roboto: 'Roboto',
        nunito: 'Nunito',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

