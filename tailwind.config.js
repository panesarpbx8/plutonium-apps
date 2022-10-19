/** @type {import("tailwindcss").Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts}", "layouts/**/*.html", "styles/*.scss"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
}

