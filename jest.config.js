// const esModules = ["expo-localization", "react-native-flash-message"].join("|");
// const config = {
//   //   testEnvironment: "node",
//   //   type: "module",
//   //   target: "esnext",
//   //   module: "commonjs",
//   //   verbose: true,
//   //   transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
//   //   preset: "ts-jest",
//   //   transform: {
//   //     "^.+\\.(ts|tsx)?$": "ts-jest",
//   //     "^.+\\.(js|jsx)$": "babel-jest",
//   moduleNameMapper: {
//     "\\.svg": "<rootDir>/__mocks__/svgMock.js",
//   },
//   //   },
// };

// module.exports = config;

// // Or async function
module.exports = async () => {
  return {
    // moduleDirectories: ["node_modules", "assets"],
    // testEnvironment: "node",
    // type: "module",
    // target: "esnext",
    // module: "commonjs",
    // verbose: true,
    // transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    // preset: "ts-jest",
    transform: {
      // "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
      "^.+\\.svg$": "<rootDir>/__mocks__/svgMock.js",
      // "^.+\\.svg$": "jest-svg-transformer",
      //   "^.+\\.(ts|tsx)?$": "ts-jest",
      //   "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
      // "\\.svg": "<rootDir>/__mocks__/svgMock.js",
    },
    // moduleNameMapper: {
    //   //   "^.+\\.svg$": "jest-svg-transformer",
    //   //   "^.+\\.svg$": "<rootDir>/__mocks__/svgMock.js",
    // },
    // },
  };
};
