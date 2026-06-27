// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 MAKE SURE THIS LINE IS EXACTLY LIKE THIS
  ],
  darkMode: "class", // StayHub is default dark
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0B0F19", // Deep premium canvas
          surface: "#1E2330", // Card and modal background
          muted: "#94A3B8", // Accessible gray text
          accent: "#3B82F6", // Electric Blue primary
          highlight: "#8B5CF6", // Neon Purple secondary
          success: "#10B981", // Emerald Green for available/booked
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "neon-blue": "0 0 20px rgba(59, 130, 246, 0.15)",
      },
    },
  },
  plugins: [],
};
