import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        terminal: {
          bg: 'var(--bg-color)',
          fg: 'var(--fg-color)',
          accent: 'var(--accent-color)',
          secondary: 'var(--secondary-color)',
        },
      },
      animation: {
        'scan': 'scan 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(4px)' },
        },
        glow: {
          '0%, 100%': {
            textShadow: '0 0 10px var(--fg-color), 0 0 20px var(--fg-color)',
          },
          '50%': {
            textShadow: '0 0 20px var(--fg-color), 0 0 30px var(--fg-color)',
          },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config