// import axios from "axios";
// import { login } from "../index";
import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import loginReducer from "../../reducers/loginReducer";
import * as actionTypes from "../actionTypes";
import { forgotPassword } from "../loginActions";
// var querystring = require("querystring");
// const BASE_URL = "https://api.devoa.optimizeapp.com/api/";
beforeAll(() => (Axios.defaults.adapter = require("axios/lib/adapters/http")));
describe("LoginAction", () => {
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
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  describe(`forgotPassword Action / Reducer`, () => {
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
});

// describe("when a user logs in", () => {
//   let store;
//   beforeEach(() => {
//     store = mockStore({ phoneNumbers: [] });
//   });
//   it("fires a forgot passwordd request action", () =>
//     store
//       .dispatch(
//         forgotPassword({ email: "imran@optimizeapp.com" }, mockServiceCreator())
//       )
//       .then(() =>
//         expect(store.getActions()).toContainEqual({
//           type: actionTypes.FORGOT_PASSWORD,
//         })
//       ));
// });
// describe("forgot password", () => {
//   it("forgot password", () => {
//     const apiResult = axios({
//       url: `${BASE_URL}password/email`,
//       method: "POST",
//       data: { email: "saadiya@optimizeapp.com" },
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         // console.log("forgot password response", response.data);

//         expect(response.data).toMatchObject({
//           status: "We have e-mailed your password reset link!",
//         });
//       })
//       .catch((error) => {
//         // console.log("forgot password error", error.response || error.message);
//         expect(error.response.data).toMatchObject({
//           email: "We can't find a user with that e-mail address.",
//         });
//       });
//     return apiResult;
//   });
// });
