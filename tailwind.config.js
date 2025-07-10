/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Roboto', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        bengali: ['Roboto', 'Noto Sans Bengali', 'Hind Siliguri', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      lineHeight: {
        tighter: '1.1',
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const newUtilities = {
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
}
