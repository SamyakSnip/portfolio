/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0f',
        'bg-darker': '#1a1a2e',
        'cyan': '#00f0ff',
        'purple': '#9d4edd',
        'purple-light': '#c77dff',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.3)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.3)',
        'terminal': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}