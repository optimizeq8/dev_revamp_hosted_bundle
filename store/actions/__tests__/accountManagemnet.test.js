import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../reducers/accountManagementReducer";
import accountManagementReducer from "../../reducers/accountManagementReducer";
import * as actionTypes from "../actionTypes";
import {
  checkBusinessVerified,
  createBusinessAccount,
  create_snapchat_ad_account,
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
  acceptedSnapTermsResponse,
} from "./MockedApiResponses/BusinessAccountMock";
import { getBusinessesResponseSuccess } from "./MockedApiResponses/UserBusinessResponseMock";
import { getBusinessAccounts } from "../genericActions";
import reducer from "../../reducers";
import FlashMessage from "react-native-flash-message";
import { unauthorizedBusinessResponse } from "./MockedApiResponses/SnapCampaignsMock";
import store, { originalStore } from "../../index";
jest.mock("@segment/analytics-react-native", () => {
  return {
    track: jest.fn(),
    group: jest.fn(),
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
      const mockedStore = mockStore(
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

      const dispatchedStore = mockedStore.dispatch(
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
        expect(mockedStore.getActions()).toEqual([
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
      const mockedStore = mockStore(
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
      const dispatchedStore = mockedStore.dispatch(
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
        expect(mockedStore.getActions()).toEqual([
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
  test("should handle getting businesses for user after logging in SUCCESSFUL action", () => {
    const mockedStore = mockStore(
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
    const dispatchedStore = mockedStore.dispatch(getBusinessAccounts());
    return dispatchedStore.then(() => {
      expect(mockedStore.getActions()).toEqual([
        { payload: true, type: actionTypes.SET_LOADING_BUSINESS_LIST },
        {
          payload: {
            data: [...getBusinessesResponseSuccess.data],
            index: 0,
            userid: mockedStore.getState().auth.userInfo.id,
            user: mockedStore.getState().auth.userInfo,
          },
          type: actionTypes.SET_BUSINESS_ACCOUNTS,
        },
      ]);
      expect(
        reducer(undefined, {
          payload: {
            data: [...getBusinessesResponseSuccess.data],
            index: 0,
            userid: mockedStore.getState().auth.userInfo.id,
            user: mockedStore.getState().auth.userInfo,
          },
          type: actionTypes.SET_BUSINESS_ACCOUNTS,
        }).account.businessAccounts
      ).toEqual(getBusinessesResponseSuccess.data);
      expect(
        reducer(undefined, {
          payload: {
            data: [...getBusinessesResponseSuccess.data],
            index: 0,
            userid: mockedStore.getState().auth.userInfo.id,
            user: mockedStore.getState().auth.userInfo,
          },
          type: actionTypes.SET_BUSINESS_ACCOUNTS,
        }).account.mainBusiness
      ).toEqual(getBusinessesResponseSuccess.data[0]);
    });
  });
});

describe("Create business account", () => {
  test("should handle creating a business for user SUCCESSFUL action", () => {
    const mockedStore = mockStore(
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
    const dispatchedStore = mockedStore.dispatch(
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
      expect(mockedStore.getActions()).toEqual([
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
    const mockedStore = mockStore(
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
    const dispatchedStore = mockedStore.dispatch(
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
      expect(mockedStore.getActions()).toEqual([
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
    const mockedStore = mockStore(
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
    const dispatchedStore = mockedStore.dispatch(
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
      expect(mockedStore.getActions()).toEqual([
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
    const mockedStore = mockStore(
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
    const dispatchedStore = mockedStore.dispatch(deleteBusinessAccount(14));
    return dispatchedStore.then(() => {
      expect(mockedStore.getActions()).toEqual([
        { type: actionTypes.DELETE_BUSINESS_LOADING, payload: true },
        {
          type: actionTypes.DELETE_BUSINESS_ACCOUNT,
          payload: 14,
        },
      ]);
    });
  });

  test("should handle deleting a business for unauthorized user", () => {
    const mockedStore = mockStore(
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
        response: unauthorizedBusinessResponse,
      });
    });
    const dispatchedStore = mockedStore.dispatch(deleteBusinessAccount(14));
    return dispatchedStore.then(() => {
      expect(mockedStore.getActions()).toEqual([
        { type: actionTypes.DELETE_BUSINESS_LOADING, payload: true },
        { type: actionTypes.DELETE_BUSINESS_LOADING, payload: false },
      ]);
    });
  });
});

describe("Business approval request", () => {
  test("should handle requesting approval for business SUCCESSFUL action", () => {
    const mockedStore = mockStore(
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
        response: approvalRequestSuccessResponse(2),
      });
    });
    const dispatchedStore = mockedStore.dispatch(
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
      expect(mockedStore.getActions()).toEqual([
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: true },
        {
          payload: {
            approved: 2,
          },
          type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
        },
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: false },
      ]);
    });
  });

  test("should handle rejecting approval for business SUCCESSFUL action", () => {
    const mockedStore = mockStore(
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
        response: approvalRequestSuccessResponse(3),
      });
    });
    const dispatchedStore = mockedStore.dispatch(
      checkBusinessVerified(14, (string) => string)
    );
    return dispatchedStore.then(() => {
      expect(mockedStore.getActions()).toEqual([
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: true },
        {
          payload: {
            approved: 3,
          },
          type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
        },
        {
          payload: {
            reject_reason: {
              title: "REASON FOR REJECTION",
              message: "DESCRIPTION FOR REJECTION",
            },
          },
          type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
        },
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: false },
      ]);
    });
  });
  test("should handle approval of business SUCCESSFUL action", () => {
    const mockedStore = mockStore(
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
        response: approvalRequestSuccessResponse(1),
      });
    });
    const dispatchedStore = mockedStore.dispatch(
      checkBusinessVerified(14, (string) => string)
    );
    return dispatchedStore.then(() => {
      jest.spyOn(FlashMessage, "showMessage");
      expect(FlashMessage.showMessage).toBeCalledWith({
        type: "success",
        message: "Your Business Is Now Verified!",
        description: "Get started and launch your ads now",
        duration: 10000,
      });
      expect(mockedStore.getActions()).toEqual([
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: true },
        {
          payload: {
            approved: 1,
          },
          type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
        },
        { type: actionTypes.CHECK_BUSINESS_STATUS, payload: false },
      ]);
    });
  });
});

describe("Snapchat terms", () => {
  beforeEach(() => {
    actualStore = originalStore;
  });
  test("should handle accepting snapchat terms", () => {
    let mockedStore = mockStore(
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

    mockedStore = mockStore(
      reducer(
        { ...mockedStore.getState() },
        {
          payload: {
            data: [...getBusinessesResponseSuccess.data],
            index: 0,
            userid: mockedStore.getState().auth.userInfo.id,
            user: mockedStore.getState().auth.userInfo,
          },
          type: actionTypes.SET_BUSINESS_ACCOUNTS,
        }
      )
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: acceptedSnapTermsResponse,
      });
    });
    const dispatchedStore = mockedStore.dispatch(
      create_snapchat_ad_account({ business_id: 14 }, (string) => string)
    );

    return dispatchedStore.then(() => {
      expect(
        reducer(
          { ...mockedStore.getState() },
          {
            type: actionTypes.CREATE_SNAPCHAT_AD_ACCOUNT,
            payload: acceptedSnapTermsResponse,
          }
        ).account.mainBusiness
      ).toEqual(getBusinessesResponseSuccess.data[0]);
      expect(mockedStore.getActions()).toEqual([
        { type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT, payload: true },
        {
          type: actionTypes.CREATE_SNAPCHAT_AD_ACCOUNT,
          payload: acceptedSnapTermsResponse.data,
        },
      ]);
    });
  });
  test("should handle snapchat terms for unauthorized user", () => {
    const mockedStore = mockStore(
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
        response: unauthorizedBusinessResponse,
      });
    });
    const dispatchedStore = mockedStore.dispatch(
      create_snapchat_ad_account({ business_id: 14 }, (string) => string)
    );
    return dispatchedStore.then(() => {
      jest.spyOn(FlashMessage, "showMessage");
      expect(FlashMessage.showMessage).toBeCalledWith({
        type: "danger",
        position: "top",
        message: "Unauthenticated.",
      });
      expect(mockedStore.getActions()).toEqual([
        { type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT, payload: true },
        {
          type: actionTypes.ERROR_CREATE_SNAPCHAT_AD_ACCOUNT,
          payload: {
            loading: false,
            errorData: unauthorizedBusinessResponse,
          },
        },
      ]);
    });
  });
});
