/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.1)",
        glassHover: "rgba(255, 255, 255, 0.2)",
        sidebar: "#1e1e2e",
        main: "#11111b",
        accent: "#cba6f7",
        // Catppuccin mocha inspired palette
      }
    },
  },
  plugins: [],
}
