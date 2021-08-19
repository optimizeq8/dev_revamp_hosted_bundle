// import axios from "axios";
// import { login } from "../index";
import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
// import NavigationService from "../../../NavigationService";

import loginReducer from "../../reducers/loginReducer";
import authReducer from "../../reducers/authReducer";

import * as actionTypes from "../actionTypes";
import { forgotPassword, login } from "../loginActions";
// import * as SecureStore from "expo-secure-store";
import NavigationService from "../../../NavigationService";

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
      //  const successAction = {
      //    type: actionTypes.FORGOT_PASSWORD,
      //    payload: {
      //      success: true,
      //      message: "We have e-mailed your password reset link!",
      //    },
      //  };
      const store = mockStore(
        authReducer(undefined, actionTypes.SET_CURRENT_USER)
      );
      const dispatchedStore = store.dispatch(
        login(
          { email: "imran@optimizeapp.com", password: "imranoa@2021" },
          NavigationService
        )
      );

      return dispatchedStore.then(() => {
        console.log(
          "store.getActions()",
          JSON.stringify(store.getActions(), null, 2)
        );
        //  expect(store.getActions()).toEqual([
        //    { payload: true, type: actionTypes.CHANGE_PASSWORD_LOADING },
        //    { payload: false, type: actionTypes.CHANGE_PASSWORD_LOADING },
        //    {
        //      type: actionTypes.FORGOT_PASSWORD,
        //      payload: {
        //        success: true,
        //        message: "We have e-mailed your password reset link!",
        //      },
        //    },
        //  ]);
      });
    });
  });
});
