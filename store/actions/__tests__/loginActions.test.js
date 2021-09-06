// import axios from "axios";
// import { login } from "../index";
import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import {
  changePasswordSuccessResponse,
  changePasswordFailureResponse,
} from "./MockedApiResponses/ChangePasswordMock";
import {
  forgotPasswordSuccessMockResponse,
  forgotPasswordMissingEmailFailureMockResponse,
  forgotPasswordFailureMockResponse,
} from "./MockedApiResponses/ForgotPasswordMock";
// import NavigationService from "../../../NavigationService";

import loginReducer from "../../reducers/loginReducer";
import reducer from "../../reducers";

import * as actionTypes from "../actionTypes";
import {
  changePassword,
  checkHashForUser,
  forgotPassword,
  login,
} from "../loginActions";
// import * as SecureStore from "expo-secure-store";
import NavigationService from "../../../NavigationService";
import {
  intercomHashSuccessResponse,
  intercomHashFailureResponse,
} from "./MockedApiResponses/IntercomHashTokenMock";
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

  describe(`login Action / Reducer`, () => {
    test("should handle login SUCCESS action ", () => {
      const successAction = {
        type: actionTypes.SET_CURRENT_USER,
        payload: {
          id: 9,
          first_name: "Saadiya",
          last_name: "Kazi",
          mobile: "+96597376438",
          email: "saadiya@optimizeapp.com",
          verified: 0,
          tmp_pwd: 0,
        },
      };
      const store = mockStore(reducer(undefined, successAction));
      const dispatchedStore = store.dispatch(
        login(
          { email: "saadiya@optimizeapp.com", password: "saadiyaoa@2021" },
          { navigate: () => {} }
        )
      );

      return dispatchedStore.then(() => {
        // console.log("store.getActions()", store.getActions());
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
            payload: false,
            type: actionTypes.CHECKING_FOR_TOKEN,
          },
          successAction,
          {
            type: actionTypes.SET_LOADING_USER,
            payload: false,
          },
        ]);
      });
    });
    test("should handle login FAILURE action ", () => {
      const failureAction = {
        type: actionTypes.SET_LOADING_USER,
        payload: {
          loading: false,
        },
      };
      const store = mockStore(reducer(undefined, failureAction));
      const dispatchedStore = store.dispatch(
        login(
          { email: "saadiya@optimizeapp.com", password: "saadiyao" },
          { navigate: (routeName, params) => {} }
        )
      );

      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.SET_LOADING_USER,
            payload: true,
          },

          {
            type: actionTypes.SET_LOADING_USER,
            payload: false,
          },
        ]);
      });
    });
  });

  describe("Change Password Action/ Reducer", () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
    test("Change Password Failure action", () => {
      const failureAction = {
        type: actionTypes.ERROR_CHANGE_PASSWORD,
        payload: {
          success: false,
          message: "Incorrect current password",
          loading: false,
        },
      };
      const store = mockStore(reducer(undefined, failureAction));
      const dispatchedStore = store.dispatch(
        changePassword(
          "12345678",
          "saadiyaoa@2021",
          NavigationService,
          "saadiya@optimizeapp.com"
        )
      );
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 422,
          response: changePasswordFailureResponse,
        });
      });

      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.CHANGE_PASSWORD,
            payload: { success: false, message: null, loading: true },
          },
          {
            type: actionTypes.ERROR_CHANGE_PASSWORD,
            payload: {
              success: false,
              message: "Incorrect current password",
              loading: false,
            },
          },
        ]);
      });
    });

    test("Change Password Success action", () => {
      const failureAction = {
        type: actionTypes.CHANGE_PASSWORD,
        payload: {
          success: false,
          message: null,
          loading: false,
        },
      };
      const store = mockStore(reducer(undefined, failureAction));

      const dispatchedStore = store.dispatch(
        changePassword(
          "saadiyaoa@2021",
          "saadiyaoa@202121",
          "saadiyaoa@202121",
          { navigate: () => {}, getParam: () => {} },
          "saadiya@optimizeapp.com"
        )
      );
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: changePasswordSuccessResponse,
        });
      });
      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.CHANGE_PASSWORD,
            payload: {
              success: false,
              message: null,
              loading: true,
            },
            // {
            //     //   type: actionTypes.CHANGE_PASSWORD,
            //     //   payload: {
            //     //     success: true,
            //     //     message: "Password Updated",
            //     //     loading: true,
            //     //   },
            //     // },
          },
        ]);
      });
    });
  });

  describe(`forgotPassword Action / Reducer`, () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
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
        forgotPassword("email@optimizeapp.com", { goBack: () => {} })
      );
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 422,
          response: forgotPasswordFailureMockResponse,
        });
      });
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
        forgotPassword("saadiya@optimizeapp.com", { goBack: () => {} })
      );
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: forgotPasswordSuccessMockResponse,
        });
      });
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
          // {
          //   type: actionTypes.FORGOT_PASSWORD,
          //   payload: {
          //     success: false,
          //     message: "Please wait before retrying.",
          //   },
          // },
        ]);
      });
    });

    test("should handle forgotPassword when no email is passed action", () => {
      const failureAction = {
        type: actionTypes.FORGOT_PASSWORD,
        payload: {
          success: false,
          message: "The email field is required.",
        },
      };
      const store = mockStore(loginReducer(undefined, failureAction));
      const dispatchedStore = store.dispatch(
        forgotPassword(null, { goBack: () => {} })
      );
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 422,
          response: forgotPasswordMissingEmailFailureMockResponse,
        });
      });
      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          { payload: true, type: actionTypes.CHANGE_PASSWORD_LOADING },
          { payload: false, type: actionTypes.CHANGE_PASSWORD_LOADING },
          {
            type: actionTypes.FORGOT_PASSWORD,
            payload: {
              success: false,
              message: "The email field is required.",
            },
          },
        ]);
      });
    });
  });

  describe("checkIntercomHashForUser Action / Redducer", () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
    test("intercomhash SUCCESS", () => {
      const successAction = {
        type: actionTypes.SET_HASH_INTERCOM_KEYS,
        payload: {
          android:
            "971eed707846b6e43d08ad7557f7d2200bb7312d4f3ca2a971d9589340f2d06b",
          ios: "e902ecf4da6201daee14caf0078549898bbf257ecb046c6049b50a5e70b4c912",
        },
      };

      const store = mockStore(reducer(undefined, successAction));
      const dispatchedStore = store.dispatch(checkHashForUser());
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: intercomHashSuccessResponse,
        });
      });
      return dispatchedStore.then(() => {
        // console.log("store.getActions()", store.getActions());
        expect(store.getActions()).toEqual([successAction]);
      });
    });
    test("intercomhash FAILURE", () => {
      const failureAction = {
        type: actionTypes.SET_HASH_INTERCOM_KEYS,
        payload: { ios: null, android: null },
      };

      const store = mockStore(reducer(undefined, failureAction));
      const dispatchedStore = store.dispatch(checkHashForUser());
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: intercomHashFailureResponse,
        });
      });
      return dispatchedStore.then(() => {
        // console.log("store.getActions()", store.getActions());
        expect(store.getActions()).toEqual([failureAction]);
      });
    });
  });
});
