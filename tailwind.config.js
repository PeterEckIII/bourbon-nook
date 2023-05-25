/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js,css}"],
  // important: '[data-table-library_table]',
  theme: {
    extend: {
      boxShadow: {
        followBtnHover: "0 0 0 0 #65c886, inset 6em 3.5em 0 0 #65c886",
        table:
          "0px 0px 20px rgba(0,0,0,0.1), 0px 10px 20px rgba(0,0,0,0.05), 0px 20px 20px rgba(0,0,0,0.05), 0px 30px 20px rgba(0,0,0,0.05)",
      },
      borderColor: {
        followerBtn: "#8fc688",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
