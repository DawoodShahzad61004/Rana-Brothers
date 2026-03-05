/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#166534', // deep green
          secondary: '#0f766e', // teal
          accent: '#f59e0b', // amber
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 118, 110, 0.12)',
      },
    },
  },
  plugins: [],
}

