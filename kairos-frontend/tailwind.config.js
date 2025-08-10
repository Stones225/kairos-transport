/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Orange (10% usage - Accents only)
          orange: {
            50: '#FFF4F1',
            100: '#FFE8E1', 
            400: '#FF9D7A',
            500: '#FF7F50',  // Main orange
            600: '#E6723D',
            700: '#CC5A2A',
            800: '#B34317',
            900: '#8A3309'
          },
          // Gray (30% usage - Text, borders, backgrounds)
          gray: {
            25: '#FCFCFC',
            50: '#F9FAFB',
            100: '#F2F4F7',
            200: '#E4E7EC',
            300: '#D0D5DD',
            400: '#98A2B3',
            500: '#667085',
            600: '#475467',
            700: '#333333',  // Main dark gray
            800: '#1D2939',
            900: '#101828'
          },
          // White & Neutral (60% usage - Main backgrounds)
          neutral: {
            0: '#FFFFFF',    // Pure white
            25: '#FEFEFE',
            50: '#FDFDFD',
            100: '#FBFBFB',
            200: '#F8F9FA',
            300: '#F1F3F4'
          }
        },
        // Status colors
        success: {
          50: '#ECFDF3',
          500: '#10B981',
          600: '#059669'
        },
        error: {
          50: '#FEF2F2', 
          500: '#E63946',  // Main red
          600: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system'],
        display: ['Playfair Display', 'Georgia', 'serif'],
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
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 0 1px rgba(255, 127, 80, 0.1), 0 1px 3px rgba(255, 127, 80, 0.1), 0 4px 8px rgba(255, 127, 80, 0.1)',
      }
    },
  },
  plugins: [],
}