// import axios from "axios";
// import { login } from "../index";
import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
// import NavigationService from "../../../NavigationService";

import loginReducer from "../../reducers/loginReducer";
import reducer from "../../reducers";

import * as actionTypes from "../actionTypes";
import { changePassword, forgotPassword, login } from "../loginActions";
// import * as SecureStore from "expo-secure-store";
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
jest.mock("@segment/analytics-react-native", () => {
  return {
    track: jest.fn(),
    identify: jest.fn(),
    flush: jest.fn(),
    reset: jest.fn(),
    alias: jest.fn(),
  };
});
// var querystring = require("querystring");
// const BASE_URL = "https://api.devoa.optimizeapp.com/api/";
beforeAll(() => (Axios.defaults.adapter = require("axios/lib/adapters/http")));

describe("LoginAction", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  describe(`forgotPassword Action / Reducer`, () => {
    const initialState = {
      exponentPushToken: null,
      admin: false,
      clearTokenLoading: false,
      checkingForToken: false,
      forgotPasswordSuccess: null,
      forgotPasswordMessage: "",
      temp_exist: 0,
      passwordValid: false,
      checkingPassword: false,
      forgotPasswordLoading: false,
    };
    test("should return initial state", () => {
      const state = loginReducer(undefined, actionTypes.FORGOT_PASSWORD);
      expect(state).toEqual(initialState);
    });
    test("should handle forgotPassword FAILURE action", () => {
      const failureAction = {
        type: actionTypes.FORGOT_PASSWORD,
        payload: {
          success: false,
          message: "We can't find a user with that e-mail address.",
        },
      };

      const store = mockStore(loginReducer(undefined, failureAction));
      const dispatchedStore = store.dispatch(
        forgotPassword("email@optimizeapp.com")
      );

      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          { payload: true, type: actionTypes.CHANGE_PASSWORD_LOADING },
          { payload: false, type: actionTypes.CHANGE_PASSWORD_LOADING },
          {
            type: actionTypes.FORGOT_PASSWORD,
            payload: {
              success: false,
              message: "We can't find a user with that e-mail address.",
            },
          },
        ]);
      });
    });

    test("should handle forgotPassword SUCCESS action ", () => {
      const successAction = {
        type: actionTypes.FORGOT_PASSWORD,
        payload: {
          success: true,
          message: "We have e-mailed your password reset link!",
        },
      };
      const store = mockStore(loginReducer(undefined, successAction));
      const dispatchedStore = store.dispatch(
        forgotPassword("imran@optimizeapp.com")
      );

      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          { payload: true, type: actionTypes.CHANGE_PASSWORD_LOADING },
          { payload: false, type: actionTypes.CHANGE_PASSWORD_LOADING },
          {
            type: actionTypes.FORGOT_PASSWORD,
            payload: {
              success: true,
              message: "We have e-mailed your password reset link!",
            },
          },
        ]);
      });
    });

    test("should handle forgotPassword when no email is passed action", () => {
      const failureAction = {
        type: actionTypes.FORGOT_PASSWORD,
        payload: {
          success: false,
          message: "The given data was invalid.",
        },
      };
      const store = mockStore(loginReducer(undefined, failureAction));
      const dispatchedStore = store.dispatch(forgotPassword(null));

      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          { payload: true, type: actionTypes.CHANGE_PASSWORD_LOADING },
          { payload: false, type: actionTypes.CHANGE_PASSWORD_LOADING },
          {
            type: actionTypes.FORGOT_PASSWORD,
            payload: {
              success: false,
              message: "The given data was invalid.",
            },
          },
        ]);
      });
    });
  });

  describe(`login Action / Reducer`, () => {
    test("should handle login SUCCESS action ", () => {
      const successAction = {
        type: actionTypes.SET_CURRENT_USER,
        payload: {
          id: 11,
          first_name: "Imran",
          last_name: "Sheikh",
          mobile: "+96522112288",
          email: "imran@optimizeapp.com",
          verified: 1,
        },
      };
      const store = mockStore(reducer(undefined, successAction));
      const dispatchedStore = store.dispatch(
        login(
          { email: "imran@optimizeapp.com", password: "imranoa@2021" },
          NavigationService
        )
      );

      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.SET_LOADING_USER,
            payload: true,
          },
          {
            type: actionTypes.USER_PROFILE_LOADING,
            payload: true,
          },
          {
            type: actionTypes.USER_PROFILE_LOADING,
            payload: false,
          },
          {
            type: actionTypes.SET_CURRENT_USER,
            payload: {
              id: 11,
              first_name: "Imran",
              last_name: "Sheikh",
              mobile: "+96522112288",
              email: "imran@optimizeapp.com",
              verified: 1,
            },
          },
          {
            type: actionTypes.SET_LOADING_USER,
            payload: false,
          },
        ]);
      });
    });
    //   test("should handle login FAILURE action ", () => {
    //     const failureAction = {
    //       type: actionTypes.SET_CURRENT_USER,
    //       payload: {
    //         id: 11,
    //         first_name: "Imran",
    //         last_name: "Sheikh",
    //         mobile: "+96522112288",
    //         email: "imran@optimizeapp.com",
    //         verified: 1,
    //       },
    //     };
    //     const store = mockStore(reducer(undefined, failureAction));
    //     const dispatchedStore = store.dispatch(
    //       login({ email: null, password: "imrano" }, NavigationService)
    //     );

    //     return dispatchedStore.then(() => {
    //       expect(store.getActions()).toEqual([
    //         {
    //           type: actionTypes.SET_LOADING_USER,
    //           payload: true,
    //         },
    //         // {
    //         //   type: actionTypes.USER_PROFILE_LOADING,
    //         //   payload: true,
    //         // },
    //         // {
    //         //   type: actionTypes.USER_PROFILE_LOADING,
    //         //   payload: false,
    //         // },
    //         // {
    //         //   type: actionTypes.SET_CURRENT_USER,
    //         //   payload: {
    //         //     id: 11,
    //         //     first_name: "Imran",
    //         //     last_name: "Sheikh",
    //         //     mobile: "+96522112288",
    //         //     email: "imran@optimizeapp.com",
    //         //     verified: 1,
    //         //   },
    //         // },
    //         {
    //           type: actionTypes.SET_LOADING_USER,
    //           payload: false,
    //         },
    //       ]);
    //     });
    //   });
  });

  describe("Change Password Action/ Reducer", () => {
    test("Change Password Failure action", () => {
      const failureAction = {
        type: actionTypes.ERROR_CHANGE_PASSWORD,
        payload: {
          success: false,
        },
      };
      const store = mockStore(reducer(undefined, failureAction));
      const dispatchedStore = store.dispatch(
        changePassword(
          "12345678",
          "Imranoa@2021",
          NavigationService,
          "imran@optimizeapp.com"
        )
      );

      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.CHANGE_PASSWORD,
            payload: { success: false, loading: true },
          },
          {
            type: actionTypes.ERROR_CHANGE_PASSWORD,
            payload: {
              success: false,
              message: "Inccorect current password",
              loading: false,
            },
          },
        ]);
      });
    });
  });
});
