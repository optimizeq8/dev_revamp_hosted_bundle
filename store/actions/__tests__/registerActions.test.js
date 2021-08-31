import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import reducer from "../../reducers";

import {
  validateEmailSuccessMockResponse,
  validateEmailFailureMockResponse,
  validateEmailMissingeMailFailureMockResponse,
} from "./MockedApiResponses/ValidateEmailMockResponse";
import { verifyEmail, registerGuestUser } from "../registerActions";
import * as actionTypes from "../actionTypes";
import { userRegisterFailureresponse } from "./MockedApiResponses/UserRegisterMock";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.setTimeout(150000);

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
jest.mock("react-native-flash-message", () => {
  return { showMessage: jest.fn() };
});
jest.mock("@segment/analytics-react-native", () => {
  return {
    track: jest.fn(),
    identify: jest.fn(),
    flush: jest.fn(),
    reset: jest.fn(),
    alias: jest.fn(),
  };
});
jest.mock("react-navigation", () => {
  return {
    NavigationActions: {
      navigate: jest.fn(),
      navigateBack: jest.fn(),
      setTopLevelNavigator: jest.fn(),
    },
  };
});
jest.mock("expo-secure-store", () => {
  return {
    setItemAsync: jest.fn().mockImplementation(() => Promise.resolve()),
    getItemAsync: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});
beforeAll(() => (Axios.defaults.adapter = require("axios/lib/adapters/http")));
beforeEach(() => {
  moxios.install();
});
afterEach(() => {
  moxios.uninstall();
});
/*
describe("Register step 1, verify email action/ reducer", () => {
  test("Missing Email", () => {
    const failureAction = {
      type: actionTypes.ERROR_VERIFY_EMAIL,
      payload: {
        success: false,
        message: "Request failed with status code 422",
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
    const dispatchedStore = store.dispatch(
      verifyEmail("", { email: "" }, { navigate: () => {} })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: validateEmailMissingeMailFailureMockResponse,
      });
    });
    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: true,
        },
        {
          type: actionTypes.ERROR_VERIFY_EMAIL,
          payload: {
            success: false,
            userInfo: {
              email: "",
            },
            message: "Request failed with status code 404",
          },
        },
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: false,
        },
      ]);
    });
  });
  test("Email Verify Success", () => {
    const successAction = {
      type: actionTypes.VERIFY_EMAIL,
      payload: {
        success: true,
        message: "Email is allowed for registration",
      },
    };
    const store = mockStore(reducer(undefined, successAction));
    const dispatchedStore = store.dispatch(
      verifyEmail(
        "email@optimizeapp.com",
        { email: "email@optimizeapp.com" },
        { navigate: () => {} }
      )
    );

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: validateEmailSuccessMockResponse,
      });
    });
    // console.log("store.getActions() Success", store.getActions());

    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: true,
        },
        {
          type: actionTypes.VERIFY_EMAIL,
          payload: {
            success: true,
            userInfo: {
              email: "email@optimizeapp.com",
            },
            message: "Email is allowed for registration",
          },
        },
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: false,
        },
      ]);
    });
  });
  test("Email Verify Failure", () => {
    const failureAction = {
      type: actionTypes.ERROR_VERIFY_EMAIL,
      payload: {
        success: true,
        message: "Email is already registered",
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
    const dispatchedStore = store.dispatch(
      verifyEmail(
        "imran@optimizeapp.com",
        { email: "imran@optimizeapp.com" },
        { navigate: () => {} }
      )
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: validateEmailFailureMockResponse,
      });
    });
    // console.log("store.getActions()", store.getActions());
    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: true,
        },
        {
          type: actionTypes.ERROR_VERIFY_EMAIL,
          payload: {
            success: false,
            userInfo: {
              email: "imran@optimizeapp.com",
            },
            message: "Email is already registered",
          },
        },
        {
          type: actionTypes.VERIFY_EMAIL_LOADING,
          payload: false,
        },
      ]);
    });
  });
});
*/
describe("Register Step 2, User Info action/ reducer", () => {
  test("User Register Failure", async () => {
    const failureAction = {
      type: actionTypes.ERROR_REGISTER_GUEST_USER,
      payload: {
        success: false,
        message: "The mobile has already been taken.",
      },
    };
    const store = mockStore(
      reducer(undefined, {
        type: actionTypes.ERROR_REGISTER_GUEST_USER,
        payload: {
          success: false,
          message: "The mobile has already been taken.",
        },
      })
    );
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: userRegisterFailureresponse,
      });
    });
    const dispatchedStore = store.dispatch(
      registerGuestUser(
        {
          email: "saadiya@optimizekw.com",
          password: "Saadiya@2021",
          repassword: "Saadiya@2021",
          firstname: "Saadiya",
          lastname: "Kazi",
          mobile: "+96567613407",
        },
        "1",
        { navigate: () => {} },
        {}
      )
    );

    return dispatchedStore.then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.ERROR_REGISTER_GUEST_USER,
          payload: {
            success: false,
            userInfo: {
              email: "saadiya@optimizekw.com",
              firstname: "Saadiya",
              lastname: "Kazi",
              mobile: "+96567613407",
              password: "Saadiya@2021",
              repassword: "Saadiya@2021",
            },
            message: "The mobile has already been taken.",
          },
        },
      ]);
    });
  });

  // test("User Register Success", (done) => {
  //   const failureAction = {
  //     type: actionTypes.ERROR_REGISTER_GUEST_USER,
  //     payload: {
  //       success: false,
  //       message: "The mobile has already been taken.",
  //     },
  //   };
  //   console.log("mock start");
  //   const store = mockStore(reducer(undefined, failureAction));
  //   console.log("mock start 123");
  //   return moxios.wait(() => {
  //     console.log("mock start 1234");
  //     const request = moxios.requests.mostRecent();
  //     request
  //       .respondWith({
  //         status: 422,
  //         response: validateEmailMissingeMailFailureMockResponse,
  //       })
  //       .then((res) => {
  //         console.log("res 12345");
  //         done();
  //       });
  //     const dispatchStore = store.dispatch(
  //       registerGuestUser({
  //         email: "saadiya@optimizekw.com",
  //         password: "Saadiya@2021",
  //         repassword: "Saadiya@2021",
  //         firstname: "Saadiya",
  //         lastname: "Kazi",
  //         mobile: "+96567613407",
  //       })
  //     );
  //     return;
  //     console.log(
  //       "User Register state",
  //       JSON.stringify(store.getActions(), null, 2)
  //     );
  //   });
  // });
});
