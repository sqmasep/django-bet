module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: ["next/core-web-vitals", "eskiu/ts-react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: [],
  rules: {
    "react/function-component-definition": "off",
    "react/no-unescaped-entities": "off",
    "no-duplicate-imports": "off",
    "new-cap": "off",
    camelcase: "off",
    "quote-props": "off",
  },
};
