module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["react-app", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
