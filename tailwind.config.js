/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: '#0a0a0a',
        card: '#161616',
        'card-hover': '#1c1c1c',
        border: '#222222',
        'border-subtle': '#1a1a1a',
        accent: '#818cf8',
        'accent-strong': '#6366f1',
        gold: '#c9a227',
      },
      letterSpacing: {
        brand: '0.22em',
        label: '0.15em',
      },
      borderRadius: {
        card: '20px',
        pill: '100px',
      },
    },
  },
  plugins: [],
}
