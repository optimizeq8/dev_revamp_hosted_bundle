import axios from "axios";
var querystring = require("querystring");
const BASE_URL = "https://api.devoa.optimizeapp.com/api/";
describe("login", () => {
  it(`login`, () => {
    const apiResult = axios({
      url: `${BASE_URL}login`,
      method: "POST",
      data: querystring.stringify({
        email: "imran@optimizeapp.com",
        password: "imranoa@2021",
        is_mobile: 0,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        // console.log("response", response.data);

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
