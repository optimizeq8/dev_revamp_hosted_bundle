import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../reducers/accountManagementReducer";
import accountManagementReducer from "../../reducers/accountManagementReducer";
import * as actionTypes from "../actionTypes";
import { updateBusinessInfo } from "../accountManagementActions";
import moxios from "moxios";
import {
  wrongBusinessIDResponseData,
  successResponseData,
  sameNameResponseData,
} from "./MockedApiResponses/UpdateBusinessAccountMock";
import { getBusinessesResponseSuccess } from "./MockedApiResponses/UserBusinessResponseMock";
import { getBusinessAccounts } from "../genericActions";
import reducer from "../../reducers";

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
beforeAll(async () => {
  // Axios.defaults.adapter = require("axios/lib/adapters/http");
  // let token = await Axios.post("https://api.devoa.optimizeapp.com/api/login", {
  //   email: "imran@optimizeapp.com",
  //   password: "imranoa@2021",
  //   is_mobile: 0,
  // }).catch((err) => console.log("err", err));
  // Axios.defaults.headers.common.Authorization =
  //   "Bearer " + token.data.access_token;
});
beforeEach(() => {
  moxios.install();
});
afterEach(() => {
  moxios.uninstall();
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe("Account Management Actions", () => {
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
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: wrongBusinessIDResponseData,
        });
      });

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
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: successResponseData,
        });
      });
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

describe("Get business accounts", () => {
  test("should handle getting businesses for user SUCCESSFUL action", () => {
    const store = mockStore(
      reducer(undefined, {
        payload: {
          id: 11,
          first_name: "Imran",
          last_name: "Sheikh",
          mobile: "+96522112288",
          email: "imran@optimizeapp.com",
          verified: 1,
          tmp_pwd: 0,
        },
        type: "SET_CURRENT_USER",
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getBusinessesResponseSuccess,
      });
    });
    const dispatchedStore = store.dispatch(getBusinessAccounts("11"));
    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: "SET_LOADING_BUSINESS_LIST" },
        {
          payload: {
            data: [...getBusinessesResponseSuccess.data],
            index: 0,
            userid: store.getState().auth.userInfo.id,
            businessSeleced: "11",
            user: store.getState().auth.userInfo,
          },
          type: "SET_BUSINESS_ACCOUNTS",
        },
      ]);
    });
  });
});
