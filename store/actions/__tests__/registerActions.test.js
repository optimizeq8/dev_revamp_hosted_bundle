import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import reducer from "../../reducers";
import { userRegisterSuccessResponse } from "./MockedApiResponses/UserRegisterMock";
import {
  validateEmailSuccessMockResponse,
  validateEmailFailureMockResponse,
  validateEmailMissingeMailFailureMockResponse,
} from "./MockedApiResponses/ValidateEmailMockResponse";
import {
  verifyEmail,
  registerGuestUser,
  sendMobileNo,
} from "../registerActions";
import * as actionTypes from "../actionTypes";
import { userRegisterFailureresponse } from "./MockedApiResponses/UserRegisterMock";
import {
  OtpSentFailureResponse,
  OtpSentFailureResponse1,
  OtpSentSuccessResponse,
  OTPCodeUnauthenticatedErrorResponse,
  OTPCodeErrorResponse,
  OTPCodeSuccessResponse,
  OTPByCallSuccessResponse,
  OTPByCallUnauthenticatedErrorResponse,
  OTPByCallFailureResponse,
} from "./MockedApiResponses/OTPSentMock";
import { login } from "../loginActions";
import { verifyMobileCode, verifyOTPByCall } from "..";
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
beforeAll(() => {
  Axios.defaults.adapter = require("axios/lib/adapters/http");
  login(
    { email: "saadiya@optimizeapp.com", password: "saadiyaoa@2021" },
    { navigate: () => {} }
  );
});
beforeEach(() => {
  moxios.install();
});
afterEach(() => {
  moxios.uninstall();
});

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

describe("Register Step 2, User Info action/ reducer", () => {
  test("User Register Failure", async () => {
    const failureAction = {
      type: actionTypes.ERROR_REGISTER_GUEST_USER,
      payload: {
        success: false,
        message: "The mobile has already been taken.",
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
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
      console.log(
        "User Register Failure store.getActions()",
        store.getActions()
      );
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.ERROR_REGISTER_GUEST_USER,
          payload: {
            success: false,
            info: {
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

  test("User Register Success", () => {
    const successAction = {
      type: actionTypes.SET_CURRENT_USER,
      payload: {},
    };

    const store = mockStore(reducer(undefined, successAction));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: userRegisterSuccessResponse,
      });
    });
    const dispatchStore = store.dispatch(
      registerGuestUser(
        {
          email: "saadiya@optimizekw.com",
          password: "Saadiya@2021",
          repassword: "Saadiya@2021",
          firstname: "Saadiya",
          lastname: "Kazi",
          mobile: "+96597376438",
          name: "TEST SKK",
          category: "Arts",
          country_id: "2",
          instagram_handle: "saadiya.kazi",
          other_business_category: null,
        },
        "0",
        { navigate: () => {} }
      )
    );

    return dispatchStore.then(() => {
      console.log(
        "registerGuestUser success store.getActions()",
        store.getActions()
      );
    });
  });
});

describe("OTP SENT Action / Reducer", () => {
  test("OTP Failure Unauthenticated", () => {
    const failureAction = {
      type: actionTypes.ERROR_SEND_MOBILE_NUMBER,
      payload: {
        success: false,
        message: "Unauthenticated.",
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
    const dispatchStore = store.dispatch(sendMobileNo("+96567613407"));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: OtpSentFailureResponse,
      });
    });

    return dispatchStore.then(() => {
      expect(store.getActions()).toEqual([failureAction]);
    });
  });
  test("OTP Failure User Verified", () => {
    const failureAction = {
      type: actionTypes.ERROR_SEND_MOBILE_NUMBER,
      payload: {
        success: false,
        message: "User is Already Verified",
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
    const dispatchStore = store.dispatch(sendMobileNo("+96567613407"));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: OtpSentFailureResponse1,
      });
    });

    return dispatchStore.then(() => {
      expect(store.getActions()).toEqual([failureAction]);
    });
  });
  test("OTP Success", () => {
    const successAction = {
      type: actionTypes.SEND_MOBILE_NUMBER,
      payload: OtpSentSuccessResponse,
    };
    const store = mockStore(reducer(undefined, successAction));
    const dispatchStore = store.dispatch(sendMobileNo("+96567613407"));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: OtpSentSuccessResponse,
      });
    });

    return dispatchStore.then(() => {
      expect(store.getActions()).toEqual([successAction]);
    });
  });
});

describe("OTP Verify Action / Reducer", () => {
  test("OTP Code Verification User Unauthenticated Failure", () => {
    const failureAction = {
      type: actionTypes.ERROR_VERIFY_MOBILE_NUMBER,
      payload: {
        success: false,
      },
    };

    const store = mockStore(reducer(undefined, failureAction));
    const dispatchStore = store.dispatch(verifyMobileCode({ otp: "12345" }));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: OTPCodeUnauthenticatedErrorResponse,
      });
    });

    return dispatchStore.then(() => {
      expect(store.getActions()).toEqual([failureAction]);
    });
  });
  test("OTP Code Verification Failure", () => {
    const failureAction = {
      type: actionTypes.ERROR_VERIFY_MOBILE_NUMBER,
      payload: {
        success: false,
      },
    };

    const store = mockStore(reducer(undefined, failureAction));
    const dispatchStore = store.dispatch(verifyMobileCode({ otp: "12345" }));

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: OTPCodeErrorResponse,
      });
    });

    return dispatchStore.then(() => {
      expect(store.getActions()).toEqual([failureAction]);
    });
  });
  test("OTP Code Verification Success", () => {
    const successAction = {
      type: actionTypes.USER_PROFILE_LOADING,
      payload: true,
      // payload: {
      //   success: true,
      // },
    };
    const store = mockStore(reducer(undefined, successAction));
    const dispatchStore = store.dispatch(
      verifyMobileCode({ otp: "12345" }, "Mobile", "Dashboard")
    );

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: OTPCodeSuccessResponse,
      });
    });

    return dispatchStore.then(() => {
      expect(store.getActions()).toEqual([successAction]);
    });
  });
});

describe("OTP By Call Action / Reducer", () => {
  test("OTP By Call Success", () => {
    const successAction = {
      type: actionTypes.OTP_BY_CALL,
      payload: {
        success: true,
      },
    };
    const store = mockStore(reducer(undefined, successAction));
    const dispatchStore = store.dispatch(verifyOTPByCall());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: OTPByCallSuccessResponse,
      });
    });

    return dispatchStore.then(() => {
      expect(store.getActions()).toEqual([successAction]);
    });
  });

  test("OTP By Call Failure", () => {
    const failureAction = {
      type: actionTypes.OTP_BY_CALL,
      payload: {
        success: false,
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
    const dispatchStore = store.dispatch(verifyOTPByCall());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: OTPByCallFailureResponse,
      });
    });

    return dispatchStore.then(() => {
      expect(store.getActions()).toEqual([failureAction]);
    });
  });

  test("OTP By Call Unauthenticated user Failure", () => {
    const failureAction = {
      type: actionTypes.OTP_BY_CALL,
      payload: {
        success: false,
      },
    };
    const store = mockStore(reducer(undefined, failureAction));
    const dispatchStore = store.dispatch(verifyOTPByCall());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: OTPByCallUnauthenticatedErrorResponse,
      });
    });

    return dispatchStore.then(() => {
      expect(store.getActions()).toEqual([failureAction]);
    });
  });
});
