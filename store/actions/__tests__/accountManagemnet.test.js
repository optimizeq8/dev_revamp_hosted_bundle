import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../reducers/accountManagementReducer";
import accountManagementReducer from "../../reducers/accountManagementReducer";
import * as actionTypes from "../actionTypes";
import { updateBusinessInfo } from "../accountManagementActions";
// var querystring = require("querystring");
// const BASE_URL = "https://api.devoa.optimizeapp.com/api/";
beforeAll(async () => {
  Axios.defaults.adapter = require("axios/lib/adapters/http");
  let token = await Axios.post("https://api.devoa.optimizeapp.com/api/login", {
    email: "imran@optimizeapp.com",
    password: "imranoa@2021",
    is_mobile: 0,
  }).catch((err) => console.log("err", err));
  Axios.defaults.headers.common.Authorization =
    "Bearer " + token.data.access_token;
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

    test("should handle business info update FAILURE action", () => {
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
              errorMessage:
                "No query results for model [App\\Business] wrongbusinessid",

              success: false,
            },
          },
        ]);
      });
    });
    test("should handle business info update SUCCESSFUL action", () => {
      const store = mockStore(
        accountManagementReducer(undefined, {
          payload: {},
          type: "",
        })
      );
      let timestamp = new Date().getTime();
      const dispatchedStore = store.dispatch(
        updateBusinessInfo(
          "11",
          {
            name: "Updated Business name" + timestamp,
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
              name: "Updated Business name" + timestamp,
              type: "SME or Startup",
            },
          },
        ]);
      });
    });
  });
});
