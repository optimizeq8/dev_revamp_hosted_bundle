import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../../reducers/campaignReducer";
import campaignReducer from "../../reducers/campaignReducer";
import * as actionTypes from "../actionTypes";
import moxios from "moxios";
import reducer from "../../reducers";
import FlashMessage from "react-native-flash-message";
import { ad_objective } from "../campaignActions";
import {
  acceptSnapTermsResponse,
  snapAdCampaignCreatedResponse,
  unauthorizedBusinessResponse,
  oldDatesCampaignResponse,
} from "./MockedApiResponses/SnapCampaignsMock";
jest.mock("@segment/analytics-react-native", () => {
  return {
    track: jest.fn(),
    identify: jest.fn(),
    flush: jest.fn(),
    reset: jest.fn(),
    alias: jest.fn(),
  };
});
jest.mock("react-native-notifications", () => {
  return {
    RNEventEmitter: {
      registerRemoteNotifications: jest.fn(),
      events: {
        registerRemoteNotificationsRegistered: jest
          .fn()
          .mockImplementation(() => Promise.resolve()),
      },
    },
  };
});
beforeEach(() => {
  moxios.install();
});
afterEach(() => {
  moxios.uninstall();
  jest.clearAllMocks();
});

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);
describe("Snapchat Campaign Creation", () => {
  test("should return initial state", () => {
    let state = campaignReducer(undefined, {
      payload: {},
      type: "",
    });
    expect(state).toEqual(initialState);
  });
  describe("SnapAd Campaigns", () => {
    test("should handle creating ad objective for business that didn't accept snap terms", () => {
      let store = mockStore(
        reducer(undefined, {
          payload: {
            id: 10,
            name: "OP Business",
            country: {
              id: 3,
              name: "UAE",
            },
            type: "SME or Startup",
            approval_status: "Pending",
          },
          type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
        })
      );
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: acceptSnapTermsResponse,
        });
      });

      let dispatchedStore = store.dispatch(
        ad_objective(
          {
            start_date: "2021-12-12",
            end_date: "2021-12-13",
            duration: 2,
            name: "First Campaign",
            ad_format: "SNAP_AD",
            objective: "WEB_VIEW",
            savedObjective: "WEB_VIEW ",
          },
          { navigate: () => {} },
          {}
        )
      );
      return dispatchedStore.then(() => {
        jest.spyOn(FlashMessage, "showMessage");
        expect(FlashMessage.showMessage).toBeCalledWith({
          type: "danger",
          message: "Please accept snap terms and conditions",
          position: "top",
        });
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.SET_AD_LOADING_OBJ,
            payload: true,
          },
          {
            type: actionTypes.ERROR_SET_AD_OBJECTIVE,
            errorData: acceptSnapTermsResponse,
          },
        ]);
      });
    });
    test("should handle creating SNAP_AD format for business SUCCESSFUL action", () => {
      let store = mockStore(
        reducer(undefined, {
          payload: {
            id: 10,
            name: "OP Business",
            country: {
              id: 3,
              name: "UAE",
            },
            type: "SME or Startup",
            approval_status: "Pending",
          },
          type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
        })
      );
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: snapAdCampaignCreatedResponse,
        });
      });
      let navigation = {
        navigate: jest.fn((screenName, screenProps) => {}),
      };
      let dispatchedStore = store.dispatch(
        ad_objective(
          {
            start_date: "2021-12-12",
            end_date: "2021-12-13",
            duration: 2,
            name: "First Campaign",
            ad_format: "SNAP_AD",
            objective: "WEB_VIEW",
            savedObjective: "WEB_VIEW",
          },
          navigation,
          {}
        )
      );
      return dispatchedStore.then(() => {
        jest.spyOn(navigation, "navigate");
        expect(navigation.navigate).toBeCalledWith("AdDesign", {
          source: "SnapchatAdObjective",
          source_action: "a_submit_ad_objective",
        });
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.SET_AD_LOADING_OBJ,
            payload: true,
          },
          {
            payload: {
              ...snapAdCampaignCreatedResponse,
              savedObjective: "WEB_VIEW",
            },
            type: "SET_AD_OBJECTIVE",
          },
        ]);
      });
    });

    test("should handle creating ad objective for business FAILURE action", () => {
      let store = mockStore(
        reducer(undefined, {
          payload: {
            id: 10,
            name: "OP Business",
            country: {
              id: 3,
              name: "UAE",
            },
            type: "SME or Startup",
            approval_status: "Pending",
          },
          type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
        })
      );
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: unauthorizedBusinessResponse,
        });
      });

      let dispatchedStore = store.dispatch(
        ad_objective(
          {
            start_date: "2021-12-12",
            end_date: "2021-12-13",
            duration: 2,
            name: "First Campaign",
            ad_format: "SNAP_AD",
            objective: "WEB_VIEW",
            savedObjective: "WEB_VIEW",
          },
          { navigate: () => {} },
          {}
        )
      );
      return dispatchedStore.then(() => {
        jest.spyOn(FlashMessage, "showMessage");
        expect(FlashMessage.showMessage).toBeCalledWith({
          type: "danger",
          message: "Unauthenticated.",
          position: "top",
        });
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.SET_AD_LOADING_OBJ,
            payload: true,
          },
          {
            type: actionTypes.ERROR_SET_AD_OBJECTIVE,
            errorData: unauthorizedBusinessResponse,
          },
        ]);
      });
    });

    test("should handle creating ad objective for business with old dates SUCCESSFUL action", () => {
      let store = mockStore(
        reducer(undefined, {
          payload: {
            id: 10,
            name: "OP Business",
            country: {
              id: 3,
              name: "UAE",
            },
            type: "SME or Startup",
            approval_status: "Pending",
          },
          type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
        })
      );
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        request.respondWith({
          status: 422,
          response: oldDatesCampaignResponse,
        });
      });

      let dispatchedStore = store.dispatch(
        ad_objective(
          {
            start_date: "2020-12-12",
            end_date: "2020-12-13",
            duration: 2,
            name: "First Campaign",
            ad_format: "SNAP_AD",
            objective: "WEB_VIEW",
            savedObjective: "WEB_VIEW",
          },
          { navigate: () => {} },
          {}
        )
      );
      return dispatchedStore.then(() => {
        jest.spyOn(FlashMessage, "showMessage");
        expect(FlashMessage.showMessage).toBeCalledWith({
          type: "danger",
          message: "Validation error",
          position: "top",
        });
        expect(store.getActions()).toEqual([
          {
            type: actionTypes.SET_AD_LOADING_OBJ,
            payload: true,
          },
          {
            type: actionTypes.ERROR_SET_AD_OBJECTIVE,
            errorData: oldDatesCampaignResponse,
          },
        ]);
      });
    });
  });
});
