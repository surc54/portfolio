const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  purge: isProduction ? ['./src/**/*.{js,jsx,ts,tsx}'] : [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
