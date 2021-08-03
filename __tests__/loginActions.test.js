import axios from "axios";
var querystring = require("querystring");
const BASE_URL = "https://api.devoa.optimizeapp.com/api/";
describe("login", () => {
  it(`login`, () => {
    const apiResult = axios({
      url: `${BASE_URL}login`,
      method: "POST",
      data: querystring.stringify({
        email: "saadiya@optimizeapp.com",
        password: "saadiyaOA@2021",
        is_mobile: 0,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        console.log("response", response.data);

        expect(response.data).toMatchObject({
          token_type: "bearer",
          expires_in: 36000,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });

    return apiResult;
  });
});

describe("forgot password", () => {
  it("forgot password", () => {
    const apiResult = axios({
      url: `${BASE_URL}password/email`,
      method: "POST",
      data: { email: "saadiya@optimizeapp.com" },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("forgot password response", response.data);

        expect(response.data).toMatchObject({
          token_type: "bearer",
          expires_in: 36000,
        });
      })
      .catch((error) => {
        console.log("forgot password error", error);
      });
    return apiResult;
  });
});
