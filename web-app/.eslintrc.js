module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    babelOptions: {
      configFile: ".babelrc",
    },
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      parser: "babel-eslint",
    }
  ],
};
