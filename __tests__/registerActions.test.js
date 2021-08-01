import Axios from "axios";
// import fetchMock from "fetch-mock";
// var querystring = require("querystring");
var FormData = require("form-data");
describe("Registration", () => {
  it(`Registration`, () => {
    // const testData = { id: "1" };
    // fetchMock.post("*", testData);
    var formData = new FormData();
    formData.append("email", "saadiya@optimizeapp.com");
    formData.append("password", "saadiyaOA@2021");
    formData.append("password_confirmation", "saadiyaOA@2021");
    formData.append("first_name", "Saadiya");
    formData.append("last_name", "Kazi");
    formData.append("mobile", "+96567613407");

    const apiResult = Axios({
      url: "https://api.devoa.optimizeapp.com/api/users",
      method: "POST",
      data: formData,
    })
      .then((response) => {
        console.log("response", response.data);
        expect(response).toEqual({ id: 1 });
      })
      .catch((error) => {
        console.log("error", error.response || error.message);
      });
    // fetchMock.restore();
    return apiResult;
  });
});

// OTP Verification

describe("OTP Sms", () => {
  it("OTP Sms", () => {});
});
