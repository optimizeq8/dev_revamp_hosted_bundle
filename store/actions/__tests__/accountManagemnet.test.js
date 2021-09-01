import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../reducers/accountManagementReducer";
import accountManagementReducer from "../../reducers/accountManagementReducer";
import * as actionTypes from "../actionTypes";
import {
  checkBusinessVerified,
  createBusinessAccount,
  deleteBusinessAccount,
  updateBusinessInfo,
} from "../accountManagementActions";
import moxios from "moxios";
import {
  wrongBusinessIDResponseData,
  updateBusinessSuccessResponseData,
  createBusinessSuccessResponseData,
  sameNameResponseData,
  approvalRequestSuccessResponse,
} from "./MockedApiResponses/BusinessAccountMock";
import { getBusinessesResponseSuccess } from "./MockedApiResponses/UserBusinessResponseMock";
import { getBusinessAccounts } from "../genericActions";
import reducer from "../../reducers";
import FlashMessage from "react-native-flash-message";

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
  jest.clearAllMocks();
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
          response: updateBusinessSuccessResponseData,
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
          { payload: true, type: actionTypes.CHECK_BUSINESS_STATUS },
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
        type: actionTypes.SET_CURRENT_USER,
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
        { payload: true, type: actionTypes.SET_LOADING_BUSINESS_LIST },
        {
          payload: {
            data: [...getBusinessesResponseSuccess.data],
            index: 0,
            userid: store.getState().auth.userInfo.id,
            businessSeleced: "11",
            user: store.getState().auth.userInfo,
          },
          type: actionTypes.SET_BUSINESS_ACCOUNTS,
        },
      ]);
    });
  });
});

describe("Create business account", () => {
  test("should handle creating a business for user SUCCESSFUL action", () => {
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
        type: actionTypes.SET_CURRENT_USER,
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: createBusinessSuccessResponseData,
      });
    });
    const dispatchedStore = store.dispatch(
      createBusinessAccount(
        {
          name: "IM IO Business",
          category: "Construction",
          country_id: 2,
          type: "Agency",
        },
        { navigate: () => {} }
      )
    );
    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT },
        {
          payload: createBusinessSuccessResponseData.data,
          type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
        },
        {
          payload: createBusinessSuccessResponseData.data,
          type: actionTypes.ADD_BUSINESS_ACCOUNT,
        },
      ]);
    });
  });
  test("should handle creating a business for user with same name FAILURE action", () => {
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
        type: actionTypes.SET_CURRENT_USER,
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: sameNameResponseData,
      });
    });
    const dispatchedStore = store.dispatch(
      createBusinessAccount(
        {
          name: "IM IO Business",
          category: "Construction",
          country_id: 2,
          type: "Agency",
        },
        { navigate: () => {} }
      )
    );
    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT },
        {
          type: actionTypes.ERROR_ADD_BUSINESS_ACCOUNT,
          payload: {
            loading: false,
          },
        },
      ]);
    });
  });

  test("should handle creating a business for user FAILURE action", () => {
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
        type: actionTypes.SET_CURRENT_USER,
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: { errorMessage: "Something went wrong!" },
      });
    });
    const dispatchedStore = store.dispatch(
      createBusinessAccount(
        {
          name: "IM IO Business",
          category: "Construction",
          country_id: 2,
          type: "Agency",
        },
        { navigate: () => {} }
      )
    );
    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT },
        {
          type: actionTypes.ERROR_ADD_BUSINESS_ACCOUNT,
          payload: {
            loading: false,
          },
        },
      ]);
    });
  });
});

describe("Delete a business", () => {
  test("should handle deleting a business", () => {
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
        type: actionTypes.SET_CURRENT_USER,
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 204,
        response: null,
      });
    });
    const dispatchedStore = store.dispatch(deleteBusinessAccount(14));
    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        { type: actionTypes.DELETE_BUSINESS_LOADING, payload: true },
        {
          type: actionTypes.DELETE_BUSINESS_ACCOUNT,
          payload: 14,
        },
      ]);
    });
  });

  test("should handle deleting a business for unauthorized user", () => {
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
        type: actionTypes.SET_CURRENT_USER,
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: null,
      });
    });
    const dispatchedStore = store.dispatch(deleteBusinessAccount(14));
    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        { type: actionTypes.DELETE_BUSINESS_LOADING, payload: true },
        { type: actionTypes.DELETE_BUSINESS_LOADING, payload: false },
      ]);
    });
  });
});

describe("Business approval request", () => {
  test("should handle requesting approval for business SUCCESSFUL action", () => {
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
        type: actionTypes.SET_CURRENT_USER,
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: approvalRequestSuccessResponse("Requested"),
      });
    });
    const dispatchedStore = store.dispatch(
      checkBusinessVerified(14, (string) => string)
    );
    return dispatchedStore.then(() => {
      jest.spyOn(FlashMessage, "showMessage");
      expect(FlashMessage.showMessage).toBeCalledWith({
        type: "info",
        message: "Request Submitted",
        description:
          "We'll be notifying you within 24 hours, so keep your eyes peeled for our app notification and email",
        duration: 10000,
      });
      expect(store.getActions()).toEqual([
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: true },
        {
          payload: {
            approved: "User Requested",
          },
          type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
        },
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: false },
      ]);
    });
  });

  test("should handle rejecting approval for business SUCCESSFUL action", () => {
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
        type: actionTypes.SET_CURRENT_USER,
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: approvalRequestSuccessResponse("Rejected"),
      });
    });
    const dispatchedStore = store.dispatch(
      checkBusinessVerified(14, (string) => string)
    );
    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: true },
        {
          payload: {
            approved: "User Rejected",
          },
          type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
        },
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: false },
      ]);
    });
  });
  test("should handle approval of business SUCCESSFUL action", () => {
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
        type: actionTypes.SET_CURRENT_USER,
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: approvalRequestSuccessResponse("Approved"),
      });
    });
    const dispatchedStore = store.dispatch(
      checkBusinessVerified(14, (string) => string)
    );
    return dispatchedStore.then(() => {
      jest.spyOn(FlashMessage, "showMessage");
      expect(FlashMessage.showMessage).toBeCalledWith({
        type: "warning",
        message: "Your Business Is Now Verified!",
        description: "Get started and launch your ads now",
        duration: 10000,
      });
      expect(store.getActions()).toEqual([
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: true },
        {
          payload: {
            approved: "User Approved",
          },
          type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
        },
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: false },
      ]);
    });
  });
});
