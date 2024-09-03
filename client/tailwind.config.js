/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
        "[240]": "240px",
        600: "600px",
      },
      height: {
        "[70]": "70px",
        "[45]": "45px",
      },
      backgroundColor: {
        primary: "#F5F5F5",
        secondary1: "#1266dd",
        secondary2: "#f73859",
        input: "#e8f0fe",
      },
      maxWidth: {
        600: "600px",
      },
      fontSize: {
        "[-18]": "18px",
        "[-14]": "14px",
        "[-16]": "16px",
      },
      colors: {
        secondary1: "#1266dd",
        "[-red]": "#f60",
      },
    },
  },
  plugins: [],
};
