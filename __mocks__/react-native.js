// const rn = require("react-native");
// jest.mock("Linking", () => {
//   return {
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     openURL: jest.fn(),
//     canOpenURL: jest.fn(),
//     getInitialURL: jest.fn(),
//   };
// });
// module.exports = rn;

jest.mock("@segment/analytics-react-native", () => "analytics");
jest.mock("react-native-intercom", () => "Intercom");
jest.mock("react-native-flash-message", () => "showMessage");
jest.mock("expo-secure-store", () => "SecureStore");
jest.mock("react-native-notifications", () => "Notification");
jest.mock("SVGs/Objectives/index.js", () => {
  const mockComponent = require("react-native/jest/mockComponent");
  return mockComponent("assets/SVGs/Objectives/index.js");
});
