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
// jest.mock("Animated", () => {
//   return {
//     Value: jest.fn(),
//   };
// });
// module.exports = rn;

jest.mock("@segment/analytics-react-native", () => {
  return {
    track: jest.fn(),
    identify: jest.fn(),
    flush: jest.fn(),
    reset: jest.fn(),
    alias: jest.fn(),
  };
});
jest.mock("react-native-intercom", () => "Intercom");
jest.mock("react-native-flash-message", () => {
  return { showMessage: jest.fn() };
});
jest.mock("react-native-notifications", () => {
  return {
    RNEventEmitter: {
      registerRemoteNotifications: jest.fn(),
      events: {
        registerRemoteNotificationsRegistered: jest
          .fn()
          .mockImplementation(() => Promise.resolve()),
      },
    },
  };
});
jest.mock("react-navigation", () => {
  return {
    navigate: jest.fn(),
    navigateBack: jest.fn(),
    setTopLevelNavigator: jest.fn(),
  };
});
jest.mock("react-native-device-info", () => "getUniqueId");
jest.mock("expo-permissions", () => "Permissions");
jest.mock("react-native-biometrics", () => "ReactNativeBiometrics");
jest.mock("expo-secure-store", () => {
  return {
    setItemAsync: jest.fn().mockImplementation(() => Promise.resolve()),
    getItemAsync: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

jest.mock("@react-native-community/async-storage", () => {
  return {
    setItem: jest.fn().mockImplementation(() => Promise.resolve()),
    getItem: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

// jest.mock("react-native-reanimated", () => {
//   const View = require("react-native").View;

//   return {
//     Value: jest.fn(),
//     event: jest.fn(),
//     add: jest.fn(),
//     eq: jest.fn(),
//     set: jest.fn(),
//     cond: jest.fn(),
//     interpolate: jest.fn(),
//     View: View,
//     Extrapolate: { CLAMP: jest.fn() },
//     Transition: {
//       Together: "Together",
//       Out: "Out",
//       In: "In",
//     },
//   };
// });
// jest.mock("SVGs/Objectives/index.js", () => {
//   const mockComponent = require("react-native/jest/mockComponent");
//   return mockComponent("assets/SVGs/Objectives/index.js");
// });
