const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      body: ['Inter', 'system-ui', 'sans-serif']
    },
    extend: {
      colors: {
        primary: colors.green[400]
      }
    }
  },
  variants: {},
  plugins: []
}
