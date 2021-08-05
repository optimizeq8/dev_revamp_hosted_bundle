import axios from "axios";
import { login } from "../store/actions";
var querystring = require("querystring");
const BASE_URL = "https://api.devoa.optimizeapp.com/api/";
describe("login should be success", () => {
  it(`login should be success`, async () => {
    const apiResult = login({ email: "saadiy@op.com", password: "1234" }).then(
      (res) => {
        console.log("res", res);
      }
    );
    return apiResult;
  });
});

// describe("forgot password", () => {
//   it("forgot password", () => {
//     const apiResult = axios({
//       url: `${BASE_URL}password/email`,
//       method: "POST",
//       data: { email: "saadiya@optimizeapp.com" },
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         // console.log("forgot password response", response.data);

//         expect(response.data).toMatchObject({
//           status: "We have e-mailed your password reset link!",
//         });
//       })
//       .catch((error) => {
//         // console.log("forgot password error", error.response || error.message);
//         expect(error.response.data).toMatchObject({
//           email: "We can't find a user with that e-mail address.",
//         });
//       });
//     return apiResult;
//   });
// });
