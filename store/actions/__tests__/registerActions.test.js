import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "../../reducers";
import { verifyEmail } from "../registerActions";
import * as actionTypes from "../actionTypes";
import NavigationService from "../../../NavigationService";
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
jest.mock("react-native-flash-message", () => {
  return { showMessage: jest.fn() };
});
jest.mock("react-navigation", () => {
  return {
    NavigationActions: {
      navigate: jest.fn(),
      navigateBack: jest.fn(),
      setTopLevelNavigator: jest.fn(),
    },
  };
});
jest.mock("expo-secure-store", () => {
  return {
    setItemAsync: jest.fn().mockImplementation(() => Promise.resolve()),
    getItemAsync: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});
beforeAll(() => (Axios.defaults.adapter = require("axios/lib/adapters/http")));

describe("Register actions/ reducer", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  test("Email Verify Success", () => {
    const successAction = {
      type: actionTypes.VERIFY_EMAIL,
      payload: {
        success: false,
        message: "We can't find a user with that e-mail address.",
      },
    };
    const store = mockStore(reducer(undefined, successAction));
    const dispatchedStore = store.dispatch(
      verifyEmail(
        "email@optimizeapp.com",
        { email: "email@optimizeapp.com" },
        NavigationService
      )
    );

    return dispatchedStore.then(() => {
      console.log(
        "store.getActions()",
        JSON.stringify(store.getActions(), null, 2)
      );
    });
  });
  test("Email Verify Failure", () => {});
});
