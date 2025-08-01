/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        khmer: ['"Noto Sans Khmer"', 'sans-serif'],
        hanuman: ['Hanuman', 'serif'],
        battambang: ['Battambang', 'cursive'],
        siemreap: ['Siemreap', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
