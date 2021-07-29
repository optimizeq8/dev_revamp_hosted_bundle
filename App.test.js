import axios from "axios";
import fetchMock from "fetch-mock";
var querystring = require("querystring");

var FormData = require("form-data");
export const loginApi = (email, password, isMobile) => {
  var formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  //   formData.append("isMobile", isMobile);

  return axios
    .post(
      `http://api.devoa.optimizeapp.com/api/login`,
      querystring.stringify({ email, password }).join("&"),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.log("error", error);
    });
};
describe("LOGIN", () => {
  it(`checkLogin`, async () => {
    const testData = { id: "1" };
    fetchMock.get("*", testData);

    const apiResult = await loginApi(
      "imran@optimizeapp.com",
      "imranoa@2021",
      0
    ).then((response) => {
      console.log("response", response);
      expect(response).toEqual(testData);
    });
    fetchMock.restore();
    return apiResult;
  });
});
