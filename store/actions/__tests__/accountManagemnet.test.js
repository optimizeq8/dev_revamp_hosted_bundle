import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../reducers/accountManagementReducer";
import accountManagementReducer from "../../reducers/accountManagementReducer";
import * as actionTypes from "../actionTypes";
import { updateBusinessInfo } from "../accountManagementActions";
// var querystring = require("querystring");
// const BASE_URL = "https://api.devoa.optimizeapp.com/api/";
beforeAll(() => {
  Axios.defaults.headers.common.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI4MDY1Mjk5LCJleHAiOjE2MjgxMDEyOTksIm5iZiI6MTYyODA2NTI5OSwianRpIjoiUUJVNlBYMnRySXFoVk8zQiIsInN1YiI6MTIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.9peiima05QRClpI625sDpGNf2GihgbchjYK1WnrVnSM`;
  Axios.defaults.adapter = require("axios/lib/adapters/http");
});

describe("Account Management Actions", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  describe(`Business Info Action / Reducer`, () => {
    test("should return initial state", () => {
      const state = accountManagementReducer(undefined, {
        payload: {},
        type: "",
      });
      expect(state).toEqual(initialState);
    });

    test("should handle business info update Unautorized action", () => {
      const failureAction = {
        type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
        payload: {
          success: false,
          message: "We can't find a user with that e-mail address.",
        },
      };

      const store = mockStore(
        accountManagementReducer(undefined, {
          payload: {},
          type: "",
        })
      );
      const dispatchedStore = store.dispatch(
        updateBusinessInfo(
          "wrongbusinessid",
          {
            name: "Updated Business name",
            type: "SME",
            country_id: "Dean",
            mobile: "+96566645464",
          },
          { navigate: () => {} },
          () => {}
        )
      );
      console.log("store.getActions()", store.getActions());
      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          { payload: true, type: actionTypes.UPDATE_BUSINESS_INFO_LOADING },
          {
            type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
            payload: {
              errorMessage: {
                message: "Unauthenticated.",
              },
              success: false,
            },
          },
        ]);
      });
    });

    // test("should handle forgotPassword SUCCESS action ", () => {
    //   const successAction = {
    //     type: actionTypes.FORGOT_PASSWORD,
    //     payload: {
    //       success: true,
    //       message: "We have e-mailed your password reset link!",
    //     },
    //   };
    //   const store = mockStore(loginReducer(undefined, successAction));
    //   const dispatchedStore = store.dispatch(
    //     forgotPassword("imran@optimizeapp.com")
    //   );

    //   return dispatchedStore.then(() => {
    //     expect(store.getActions()).toEqual([
    //       { payload: true, type: actionTypes.CHANGE_PASSWORD_LOADING },
    //       { payload: false, type: actionTypes.CHANGE_PASSWORD_LOADING },
    //       {
    //         type: actionTypes.FORGOT_PASSWORD,
    //         payload: {
    //           success: true,
    //           message: "We have e-mailed your password reset link!",
    //         },
    //       },
    //     ]);
    //   });
    // });

    // test("should handle forgotPassword when no email is passed action", () => {
    //   const failureAction = {
    //     type: actionTypes.FORGOT_PASSWORD,
    //     payload: {
    //       success: false,
    //       message: "The given data was invalid.",
    //     },
    //   };
    //   const store = mockStore(loginReducer(undefined, failureAction));
    //   const dispatchedStore = store.dispatch(forgotPassword(null));

    //   return dispatchedStore.then(() => {
    //     expect(store.getActions()).toEqual([
    //       { payload: true, type: actionTypes.CHANGE_PASSWORD_LOADING },
    //       { payload: false, type: actionTypes.CHANGE_PASSWORD_LOADING },
    //       {
    //         type: actionTypes.FORGOT_PASSWORD,
    //         payload: {
    //           success: false,
    //           message: "The given data was invalid.",
    //         },
    //       },
    //     ]);
    //   });
    // });
  });
});
