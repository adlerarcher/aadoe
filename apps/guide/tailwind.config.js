/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Archivo', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        marquee: 'marquee 45s linear infinite',
      },
      keyframes: {
        rise: {
          '0%': { transform: 'translateY(28px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
