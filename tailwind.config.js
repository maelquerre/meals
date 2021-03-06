const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    container: {
      'center': true,
      'padding': '5%'
    },
    fontFamily: {
      'body': ['Inter', 'system-ui', 'sans-serif']
    },
    extend: {
      borderRadius: {
        'xl': '1rem'
      },
      colors: {
        'primary': colors.green[400],
        'primary-var': colors.green[500]
      },
      fontSize: {
        'sm': '.8125rem'
      }
    }
  },
  variants: {},
  plugins: []
}
