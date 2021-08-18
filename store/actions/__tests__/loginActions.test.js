// import axios from "axios";
// import { login } from "../index";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// allows us to easily return reponses and/or success/fail for a thunk that calls a service
const mockServiceCreator =
  (body, succeeds = true) =>
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
    });

import { expect } from "@jest/globals";
import nock from "nock";
import loginReducer from "../../reducers/loginReducer";
import * as actionTypes from "../actionTypes";
import { forgotPassword } from "../loginActions";
// var querystring = require("querystring");
// const BASE_URL = "https://api.devoa.optimizeapp.com/api/";
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
  describe(`Actions`, () => {
    test("should return initial state", () => {
      const state = loginReducer(undefined, actionTypes.FORGOT_PASSWORD);
      expect(state).toEqual(initialState);
    });

    test("should handle forgotPassword SUCCESS action", async () => {
      const successAction = {
        type: actionTypes.FORGOT_PASSWORD,
        payload: {
          success: true,
          message: "We have e-mailed your password reset link!",
          temp_exist: undefined,
        },
      };
      const state = loginReducer(undefined, successAction);
      const expectedresponse = {
        ...state,
        forgotPasswordSuccess: true,
        forgotPasswordMessage: "We have e-mailed your password reset link!",
        temp_exist: undefined,
      };

      // nock("https://api.devoa.optimizeapp.com/api")
      //   .post("/password/email", { email: "imran@optimizeapp.com" })
      //   .query(true)
      //   .reply(200, expectedresponse);
      // const result = await forgotPassword("imran@optimizeapp.com");
      // console.log("result", result());
      // expect(result).toEqual(expectedresponse);

      expect(expectedresponse).toEqual(state);
    });

    // test("should handle forgotPassword SUCCESS action ", () => {
    //   const state = loginReducer(
    //     undefined,
    //     forgotPassword("imran@optimizeapp.com")
    //   );
    //   expect(state).toEqual({
    //     success: true,
    //     message: "We have e-mailed your password reset link!",
    //   });
    // });

    // test("should handle forgotPassword FAILURE action", () => {
    //   const state = loginReducer(
    //     undefined,
    //     forgotPassword("imran1231@optimizeapp.com")
    //   );
    //   expect(state).toEqual({
    //     success: false,
    //     message: "We have e-mailed your password reset link!",
    //   });
    // });
  });
});

describe("when a user logs in", () => {
  let store;
  beforeEach(() => {
    store = mockStore({ phoneNumbers: [] });
  });
  it("fires a forgot passwordd request action", () =>
    store
      .dispatch(
        forgotPassword({ email: "imran@optimizeapp.com" }, mockServiceCreator())
      )
      .then(() =>
        expect(store.getActions()).toContainEqual({
          type: actionTypes.FORGOT_PASSWORD,
        })
      ));
});
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
