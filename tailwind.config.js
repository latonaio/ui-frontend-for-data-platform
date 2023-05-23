/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  // darkMode: true,
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      // https://purgecss.com/safelisting.html#patterns
      safelist: {
        standard: [/^bg-/, /^text-/],
      },
    },
  },
}
