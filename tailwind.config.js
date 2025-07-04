/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
  // Enable dark mode support
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(30deg)" },
        },
      },
      // colors: {
      //   'bright-orange': '#FFA500',
      //   'dark-mode-bg': '#1a202c', // Dark mode background color
      //   'dark-mode-text': '#f7fafc', // Dark mode text color
      // },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//        colors: {
//         'bright-orange': '#FFA500'
//       },
     
//     },
//   },
//   plugins: [],
// }