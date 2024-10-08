/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
        "[240]": "240px",
        600: "600px",
        "[280]": "280px",
        "[39]": "39px",
      },
      height: {
        "[70]": "70px",
        "[45]": "45px",
        "[240]": "240px",
        "[39]": "39px",
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
        "[-red]": "#f73859",
        "[text]": "#65676b",
      },
      borderRadius: {
        "[-50]": "50%",
      },
      backgroundImage: {
        "bg-contact":
          "url('https://www.jotform.com/blog/wp-content/uploads/2020/05/work-from-home-featured-02.png')",
      },
    },
  },
  plugins: [],
};
