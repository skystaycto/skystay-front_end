/** @type {import('tailwindcss').Config} */
module.exports = {
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
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        // Keep others for backward compatibility but discourage use
        isidora: ['Isidora', 'sans-serif'],
        sentientbold: ['Sentient-Bold', 'sans-serif'],
        sentientmedium: ['Sentient-Medium', 'sans-serif'],
        sentientregular: ['Sentient-Regular', 'sans-serif'],
        sentientlight: ['Sentient-Light', 'sans-serif'],
        melodrama: ['Melodrama', 'sans-serif'],
      },
      spacing: {
        '7.5vw': '7.5vw',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      colors: {
        blue: "#006CE4", // Primary Brand Color
        pink: "#FF385C", // Airbnb-ish Accent (secondary)
        gold: 'rgb(255, 183, 0)',

        // Airbnb-inspired Grays
        'gray-50': '#F7F7F7',
        'gray-100': '#EBEBEB',
        'gray-200': '#DDDDDD',
        'gray-300': '#717171', // Secondary Text
        'gray-400': '#222222', // Primary Text

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "12px", // Soft, modern feel
        md: "8px",
        sm: "4px",
        xl: "16px",
        '2xl': "24px",
        '3xl': "32px",
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.04)',
        'md': '0 4px 12px rgba(0,0,0,0.08)',
        'lg': '0 12px 24px rgba(0,0,0,0.12)',
        'floating': '0 20px 40px -10px rgba(0,0,0,0.1)',
        'glow-blue': '0 8px 30px rgba(0,108,228,0.3)',
        'glow-pink': '0 8px 30px rgba(255,56,92,0.3)',
        'soft-lift': '0 20px 40px -10px rgba(0,108,228,0.15)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
      },

      backgroundImage: {
        'blue-gradient': "linear-gradient(90deg, rgba(0,108,228,1) 0%, rgba(7,151,255,1) 100%)",
        'pink-blue-gradient': "linear-gradient(135deg, #006CE4 0%, #FF385C 100%)",
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)',
        'glass-gradient-dark': 'linear-gradient(145deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}