/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slateText: "#757575",
        slateOffWhite: "#F6F6F6",
        slateBlack: "#1A1919",
        slateGrey: "#DFDFDF",
      },
    },
  },
  plugins: [],
};
