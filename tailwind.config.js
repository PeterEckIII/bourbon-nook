/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      boxShadow: {
        followBtn: "0.3em 0.3em 0 0 #8fc688, inset 0.3em 0.3em 0 0 #8fc688",
        followBtnHover: "0 0 0 0 #65c886, inset 6em 3.5em 0 0 #65c886",
        followerBtnHover: "inset 6.5em 0 0 0 #65c886",
      },
      borderColor: {
        followerBtn: "#8fc688",
      },
      transitionProperty: {
        left: "left",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
