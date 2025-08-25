/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* soft-rose-30 */
        input: "var(--color-input)", /* white */
        ring: "var(--color-ring)", /* soft-rose */
        background: "var(--color-background)", /* warm-cream */
        foreground: "var(--color-foreground)", /* charcoal */
        primary: {
          DEFAULT: "var(--color-primary)", /* soft-rose */
          foreground: "var(--color-primary-foreground)", /* charcoal */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* burgundy */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* soft-red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* lavender */
          foreground: "var(--color-muted-foreground)", /* warm-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* gold */
          foreground: "var(--color-accent-foreground)", /* charcoal */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* charcoal */
        },
        card: {
          DEFAULT: "var(--color-card)", /* light-cream */
          foreground: "var(--color-card-foreground)", /* charcoal */
        },
        success: {
          DEFAULT: "var(--color-success)", /* sage-green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warm-yellow */
          foreground: "var(--color-warning-foreground)", /* charcoal */
        },
        error: {
          DEFAULT: "var(--color-error)", /* soft-red */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'dancing': ['Dancing Script', 'cursive'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '13': '3.25rem',
        '21': '5.25rem',
        '34': '8.5rem',
        '55': '13.75rem',
      },
      boxShadow: {
        'romantic': '0 8px 32px rgba(139, 21, 56, 0.08)',
        'romantic-lg': '0 12px 40px rgba(139, 21, 56, 0.12)',
        'romantic-xl': '0 20px 60px rgba(139, 21, 56, 0.15)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'bloom': 'bloom 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)', opacity: '0.8' },
        },
        bloom: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.05) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'pulse-gentle': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
        'gradient-shift': {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(10deg)' },
        },
      },
      backgroundImage: {
        'romantic-gradient': 'linear-gradient(135deg, #F8BBD9 0%, #FFF8F0 50%, #E6E6FA 100%)',
        'romantic-gradient-dark': 'linear-gradient(135deg, #8B1538 0%, #F8BBD9 100%)',
      },
      transitionTimingFunction: {
        'romantic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}