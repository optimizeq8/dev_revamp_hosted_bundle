import Axios from "axios";
// import fetchMock from "fetch-mock";
// var querystring = require("querystring");
var FormData = require("form-data");
describe("Registration", () => {
  it(`Registration`, () => {
    const apiResult = Axios({
      url: "https://api.devoa.optimizeapp.com/api/users",
      method: "POST",
      data: {
        email: "saadiya@optimizeapp.com",
        password: "saadiyaOA@2021",
        password_confirmation: "saadiyaOA@2021",
        first_name: "Saadiya",
        last_name: "Kazi",
        mobile: "+96567613407",
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log("Registration response", response.data);
        expect(response.data).toMatchObject({ id: 13 });
      })
      .catch((error) => {
        // console.log("Registration error", error.response.data);
        expect(error.response.data).toMatchObject({
          message: "The given data was invalid.",
          errors: { mobile: ["The mobile has already been taken."] },
        });
      });
    // fetchMock.restore();
    return apiResult;
  });
});

// Validate Email

describe("Validate Email for Sign Up", () => {
  it("Validate Email for Sign Up", () => {
    let email = "saadiya@optimizeapp.com";
    return Axios({
      url: `https://api.devoa.optimizeapp.com/api/validate/email/${email}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.data)
      .then((data) => {
        // console.log("validate email data", JSON.stringify(data, null, 2));
        expect(data.Status).toEqual("200");
      })
      .catch((error) => {
        console.log("validate email error", error.message || error.response);
      });
  });
});

// OTP Verification

describe("OTP Sms", () => {
  it("OTP Sms", () => {
    const apiResult = Axios({
      url: "https://api.devoa.optimizeapp.com/api/users/otp",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI3ODk1OTEwLCJleHAiOjE2Mjc5MzE5MTAsIm5iZiI6MTYyNzg5NTkxMCwianRpIjoiUTk1Y2VUak1WdmZNNnU3SiIsInN1YiI6MTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.09N6HRMZUR_oN5L6MrnSy9yww6OV1Tld2dQ31RmUyec",
      },
    })
      .then((response) => {
        // console.log("OTP Sms response", response.data);
        expect(response.data).toMatchObject({ id: 13 });
      })
      .catch((error) => {
        // console.log("OTP Sms error", error.response.data);
        expect(["Unauthenticated.", "User is Already Verified."]).toContain(
          error.response.data.message
        );
      });
    // fetchMock.restore();
    return apiResult;
  });
});

describe("OTP Sms Call", () => {
  it("OTP Sms Call", () => {
    const apiResult = Axios({
      url: "https://api.devoa.optimizeapp.com/api/users/otp/call",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI3ODk1OTEwLCJleHAiOjE2Mjc5MzE5MTAsIm5iZiI6MTYyNzg5NTkxMCwianRpIjoiUTk1Y2VUak1WdmZNNnU3SiIsInN1YiI6MTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.09N6HRMZUR_oN5L6MrnSy9yww6OV1Tld2dQ31RmUyec",
      },
    })
      .then((response) => {
        console.log("OTP Sms Call response", response.data);
        expect(response.data).toMatchObject({ id: 13 });
      })
      .catch((error) => {
        // console.log("OTP Sms Call error", error.response.data);
        expect(["Unauthenticated.", "User is Already Verified."]).toContain(
          error.response.data.message
        );
      });
    // fetchMock.restore();
    return apiResult;
  });
});

describe("OTP Sms verify", () => {
  it("OTP Sms verify", () => {
    const apiResult = Axios({
      url: "https://api.devoa.optimizeapp.com/api/users/otp/verify",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI3ODk1OTEwLCJleHAiOjE2Mjc5MzE5MTAsIm5iZiI6MTYyNzg5NTkxMCwianRpIjoiUTk1Y2VUak1WdmZNNnU3SiIsInN1YiI6MTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.09N6HRMZUR_oN5L6MrnSy9yww6OV1Tld2dQ31RmUyec",
      },
    })
      .then((response) => {
        console.log("OTP Sms verify response", response.data);
        expect(response.data).toMatchObject({ id: 13 });
      })
      .catch((error) => {
        // console.log("OTP Sms verify error", error.response.data);
        expect(["Unauthenticated.", "User is Already Verified."]).toContain(
          error.response.data.message
        );
      });
    // fetchMock.restore();
    return apiResult;
  });
});
