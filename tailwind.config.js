module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',   // Lightest
          500: '#14b8a6',  // Primary action (buttons, active states)
          700: '#0f766e',  // Hover states
          900: '#134e4a'   // Headings/dark accents
        },
        secondary: {
          500: '#10b981',  // Secondary actions
          700: '#047857'   // Highlights
        },
      },
    }
  },
  plugins: [],
}