module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/react", "@babel/env"],
    plugins:
      process.env.NODE_ENV === "production" ? ["transform-remove-console"] : [],
    env: {
      test: {
        plugins: ["@babel/plugin-transform-runtime"],
      },
    },
  };
};
