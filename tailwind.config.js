/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        primary: '#272B30',
        secondary: '#3A3F44',
        tertiary: '#32383E',
        quaternary: '#00aaff'
      },
      screens: {
        'max-sm': { max: '639' },
        'max-md': { max: '767px' },
        'max-lg': { max: '1023px' }
      }
    }
  },
  plugins: []
}
