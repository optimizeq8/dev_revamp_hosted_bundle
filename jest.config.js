// // const esModules = ["expo-localization", "react-native-flash-message"].join("|");
// // const config = {
// //   //   testEnvironment: "node",
// //   //   type: "module",
// //   //   target: "esnext",
// //   //   module: "commonjs",
// //   //   verbose: true,
// //   //   transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
// //   //   preset: "ts-jest",
// //   //   transform: {
// //   //     "^.+\\.(ts|tsx)?$": "ts-jest",
// //   //     "^.+\\.(js|jsx)$": "babel-jest",
// //   moduleNameMapper: {
// //     "\\.svg": "<rootDir>/__mocks__/svgMock.js",
// //   },
// //   //   },
// // };

// // module.exports = config;

// // Or async function
// jest.config.js
module.exports = {
  transformIgnorePatterns: [`/node_modules/react-native-svg-transformer`],

  moduleNameMapper: {
    "\\.svg": "<rootDir>/__mocks__/svgMock.js",
  },
};
