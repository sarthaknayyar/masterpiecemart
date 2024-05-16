const { colors } = require("@mui/material");

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'backgroundImage': "background.jpg",
      },
      colors: {
        zinc:'#7D7D7D',
      },
      fontFamily: {
        'dm': ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
