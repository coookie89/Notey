const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/components/Notespage.jsx"], // Paths to all relevant files
  theme: {
    extend: {}, // Add customizations here if needed
  },
  plugins: [], // Add Tailwind plugins here if required
});
