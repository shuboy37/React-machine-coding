/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "rgb(31 41 55)",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient( #FF2525, #FFE53B )",
      },
    },
  },
  plugins: [],
};
