// import axios from "axios";
// import { login } from "../index";
import loginReducer from "../../reducers/loginReducer";
import * as actionTypes from "../actionTypes";
import { forgotPassword } from "../loginActions";
// var querystring = require("querystring");
// const BASE_URL = "https://api.devoa.optimizeapp.com/api/";
describe("store/login", () => {
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
  describe(`reducer`, () => {
    test("should return initial state", () => {
      const state = loginReducer(undefined, actionTypes.FORGOT_PASSWORD);
      expect(state).toEqual(initialState);
    });

    test("should handle forgotPassword action when no email is passed", () => {
      const state = loginReducer(undefined, forgotPassword(null));
      expect(state).toEqual({
        success: false,
        message: "We have e-mailed your password reset link!",
      });
    });

    test("should handle forgotPassword SUCCESS action ", () => {
      const state = loginReducer(
        undefined,
        forgotPassword("imran@optimizeapp.com")
      );
      expect(state).toEqual({
        success: true,
        message: "We have e-mailed your password reset link!",
      });
    });

    test("should handle forgotPassword FAILURE action", () => {
      const state = loginReducer(
        undefined,
        forgotPassword("imran1231@optimizeapp.com")
      );
      expect(state).toEqual({
        success: false,
        message: "We have e-mailed your password reset link!",
      });
    });
  });
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
