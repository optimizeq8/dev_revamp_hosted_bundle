import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "../../reducers";
import { verifyEmail, registerGuestUser } from "../registerActions";
import * as actionTypes from "../actionTypes";
import NavigationService from "../../../NavigationService";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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
jest.mock("@segment/analytics-react-native", () => {
  return {
    track: jest.fn(),
    identify: jest.fn(),
    flush: jest.fn(),
    reset: jest.fn(),
    alias: jest.fn(),
  };
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

describe("Register step 1, verify email action/ reducer", () => {
  test("Missing Email", () => {
    const failureAction = {
      type: actionTypes.ERROR_VERIFY_EMAIL,
      payload: {
        success: false,
        message: "Request failed with status code 422",
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
    const dispatchedStore = store.dispatch(
      verifyEmail("", { email: "" }, NavigationService)
    );

    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: true,
        },
        {
          type: actionTypes.ERROR_VERIFY_EMAIL,
          payload: {
            success: false,
            userInfo: {
              email: "",
            },
            message: "Request failed with status code 422",
          },
        },
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: false,
        },
      ]);
    });
  });
  test("Email Verify Success", () => {
    const successAction = {
      type: actionTypes.VERIFY_EMAIL,
      payload: {
        success: true,
        message: "Email allowed for registration",
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
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: true,
        },
        {
          type: actionTypes.VERIFY_EMAIL,
          payload: {
            success: true,
            userInfo: {
              email: "email@optimizeapp.com",
            },
            message: "Email allowed for registration",
          },
        },
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: false,
        },
      ]);
    });
  });
  test("Email Verify Failure", () => {
    const failureAction = {
      type: actionTypes.ERROR_VERIFY_EMAIL,
      payload: {
        success: true,
        message: "Email allowed for registration",
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
    const dispatchedStore = store.dispatch(
      verifyEmail(
        "imran@optimizeapp.com",
        { email: "imran@optimizeapp.com" },
        NavigationService
      )
    );

    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: true,
        },
        {
          type: actionTypes.ERROR_VERIFY_EMAIL,
          payload: {
            success: false,
            userInfo: {
              email: "imran@optimizeapp.com",
            },
            message: "Email is already registered",
          },
        },
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: false,
        },
      ]);
    });
  });
});

describe("Register Step 2, User Info action/ reducer", () => {
  test("User Register Failure", () => {
    const failureAction = {
      type: actionTypes.ERROR_REGISTER_GUEST_USER,
      payload: {
        success: false,
        message: "The mobile has already been taken.",
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
    const dispatchedStore = store.dispatch(
      registerGuestUser({
        email: "saadiya@optimizekw.com",
        password: "Saadiya@2021",
        repassword: "Saadiya@2021",
        firstname: "Saadiya",
        lastname: "Kazi",
        mobile: "+96567613407",
      })
    );
    return dispatchedStore.then(() => {
      console.log(
        "User Register state",
        JSON.stringify(store.getActions(), null, 2)
      );
    });
  });
});
