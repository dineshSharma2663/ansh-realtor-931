/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08111f',
        night: '#0f172a',
        gold: '#d4af37',
        sand: '#f4e7c0',
        emerald: '#0f7a55',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 24px 80px rgba(8, 17, 31, 0.25)',
      },
      backgroundImage: {
        'hero-luxury':
          'radial-gradient(circle at top, rgba(212, 175, 55, 0.24), transparent 38%), linear-gradient(135deg, rgba(8, 17, 31, 0.94), rgba(15, 23, 42, 0.72))',
      },
    },
  },
  plugins: [],
};
