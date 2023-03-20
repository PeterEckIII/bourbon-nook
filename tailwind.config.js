/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js,css}"],
  // important: '[data-table-library_table]',
  theme: {
    extend: {
      boxShadow: {
        followBtnHover: "0 0 0 0 #65c886, inset 6em 3.5em 0 0 #65c886",
      },
      borderColor: {
        followerBtn: "#8fc688",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
