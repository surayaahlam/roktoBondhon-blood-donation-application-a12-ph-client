/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        font_primary: 'rgb(33, 33, 33) ',
        font_secondary: 'rgb(51, 51, 51)',
        font_tertiary: 'rgb(224, 224, 224)',
        font_quaternary: 'rgb(176, 176, 176)',
        primary: 'rgb(255, 87, 34)',
        secondary: 'rgb(249, 168, 37)',
        button: 'rgb(25, 118, 210)',
        footer: 'rgb(26, 26, 26)'
        
      },
      fontFamily: {
        roboto: 'Roboto',
        nunito: 'Nunito',
      },
      backgroundImage: {
        'footer_img': "url('')"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

