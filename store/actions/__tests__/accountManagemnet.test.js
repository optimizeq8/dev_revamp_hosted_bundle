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
            type: "SME or Startup",
            country_id: 2,
            mobile: "+96566645464",
          },
          { navigate: () => {} },
          () => {}
        )
      );

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

    test("should handle business info update FAILURE action", () => {
      Axios.defaults.headers.common.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI5MzcyMDI4LCJleHAiOjE2Mjk0MDgwMjgsIm5iZiI6MTYyOTM3MjAyOCwianRpIjoib2pqVU5KenpOb2NSWUpQbyIsInN1YiI6MTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.84ZTcW4_DzEtqroUoTVtqzfWrfq67P2HjjWvSwe8B2c`;

      const store = mockStore(
        accountManagementReducer(undefined, {
          payload: {},
          type: "",
        })
      );
      const dispatchedStore = store.dispatch(
        updateBusinessInfo(
          "1n1",
          {
            name: "Updated Business name",
            type: "SME or Startup",
            country_id: 2,
            mobile: "+96566645464",
          },
          { navigate: () => {} },
          () => {}
        )
      );

      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          { payload: true, type: actionTypes.UPDATE_BUSINESS_INFO_LOADING },
          {
            type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
            payload: {
              errorMessage: {
                name: ["The name has already been taken."],
              },
              success: false,
            },
          },
        ]);
      });
    });
    test("should handle business info update SUCCESSFUL action", () => {
      Axios.defaults.headers.common.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI5MzcyMDI4LCJleHAiOjE2Mjk0MDgwMjgsIm5iZiI6MTYyOTM3MjAyOCwianRpIjoib2pqVU5KenpOb2NSWUpQbyIsInN1YiI6MTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.84ZTcW4_DzEtqroUoTVtqzfWrfq67P2HjjWvSwe8B2c`;

      const store = mockStore(
        accountManagementReducer(undefined, {
          payload: {},
          type: "",
        })
      );
      let rndm = Math.random();
      const dispatchedStore = store.dispatch(
        updateBusinessInfo(
          "1n1",
          {
            name: "Updated Business name" + rndm,
            type: "SME or Startup",
            country_id: 2,
            mobile: "+96566645464",
          },
          { navigate: () => {} },
          () => {}
        )
      );
      return dispatchedStore.then(() => {
        expect(store.getActions()).toEqual([
          { payload: true, type: actionTypes.UPDATE_BUSINESS_INFO_LOADING },
          { payload: true, type: "CHECK_BUSINESS_STATUS" },
          {
            type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
            payload: {
              country_id: 2,
              mobile: "+96566645464",
              name: "Updated Business name" + rndm,
              type: "SME or Startup",
            },
          },
        ]);
      });
    });
  });
});
