// import axios from "axios";

// describe("Get Business Countries", () => {
//   it("Get Business Countries", () => {
//     const apiResult = axios({
//       url: "https://api.devoa.optimizeapp.com/api/business/country",
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI4MDY1Mjk5LCJleHAiOjE2MjgxMDEyOTksIm5iZiI6MTYyODA2NTI5OSwianRpIjoiUUJVNlBYMnRySXFoVk8zQiIsInN1YiI6MTIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.9peiima05QRClpI625sDpGNf2GihgbchjYK1WnrVnSM",
//       },
//     })
//       .then((res) => res.data)
//       .then((data) => {
//         // console.log("Get Business Countries", JSON.stringify(data, null, 2));
//         expect(data.data).toMatchObject([
//           {
//             id: 1,
//             name: "ALL",
//             iso_alpha_2: "0",
//             created_at: "2021-06-30T10:35:23.000000Z",
//             updated_at: "2021-06-30T10:35:23.000000Z",
//           },
//           {
//             id: 2,
//             name: "Kuwait",
//             iso_alpha_2: "kw",
//             created_at: "2021-06-30T10:35:23.000000Z",
//             updated_at: "2021-06-30T10:35:23.000000Z",
//           },
//           {
//             id: 3,
//             name: "UAE",
//             iso_alpha_2: "ae",
//             created_at: "2021-06-30T10:35:23.000000Z",
//             updated_at: "2021-06-30T10:35:23.000000Z",
//           },
//           {
//             id: 4,
//             name: "KSA",
//             iso_alpha_2: "sa",
//             created_at: "2021-06-30T10:35:23.000000Z",
//             updated_at: "2021-06-30T10:35:23.000000Z",
//           },
//           {
//             id: 5,
//             name: "Bahrain",
//             iso_alpha_2: "bh",
//             created_at: "2021-06-30T10:35:23.000000Z",
//             updated_at: "2021-06-30T10:35:23.000000Z",
//           },
//           {
//             id: 6,
//             name: "Oman",
//             iso_alpha_2: "om",
//             created_at: "2021-06-30T10:35:23.000000Z",
//             updated_at: "2021-06-30T10:35:23.000000Z",
//           },
//           {
//             id: 7,
//             name: "Qatar",
//             iso_alpha_2: "qa",
//             created_at: "2021-06-30T10:35:23.000000Z",
//             updated_at: "2021-06-30T10:35:23.000000Z",
//           },
//         ]);
//       })
//       .catch((error) => {
//         console.log("Get Business Countries  error ", error);
//       });
//     return apiResult;
//   });
// });

// describe("Create Business Account", () => {
//   it("api test for create business account", () => {
//     const apiResult = axios({
//       url: "https://api.devoa.optimizeapp.com/api/business",
//       method: "POST",
//       data: {
//         name: "Construction Co",
//         category: "Construction",
//         country_id: 2,
//         type: "Agency",
//       },
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI4MDY1Mjk5LCJleHAiOjE2MjgxMDEyOTksIm5iZiI6MTYyODA2NTI5OSwianRpIjoiUUJVNlBYMnRySXFoVk8zQiIsInN1YiI6MTIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.9peiima05QRClpI625sDpGNf2GihgbchjYK1WnrVnSM",
//       },
//     })
//       .then((response) => {
//         console.log("Create Business Account response", response.data);
//         expect(response.data).toMatchObject({ approval_status: "Pending" });
//       })
//       .catch((error) => {
//         console.log("error", error.response);
//         expect(error.response.data).toMatchObject({
//           message: "Unauthenticated.",
//           name: ["The name has already been taken."],
//         });
//       });
//     // fetchMock.restore();
//     return apiResult;
//   });
// });
// describe("Update User Info", () => {
//   it("api test for updating user info", () => {
//     const apiResult = axios({
//       url: "https://api.devoa.optimizeapp.com/api/users",
//       method: "PATCH",
//       data: {
//         email: "someUser@OptimizeApp.com",
//         first_name: "Sam",
//         last_name: "Dean",
//       },
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI4MDY1Mjk5LCJleHAiOjE2MjgxMDEyOTksIm5iZiI6MTYyODA2NTI5OSwianRpIjoiUUJVNlBYMnRySXFoVk8zQiIsInN1YiI6MTIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.9peiima05QRClpI625sDpGNf2GihgbchjYK1WnrVnSM",
//       },
//     })
//       .then((response) => {
//         console.log("Update User Info response", response.data);
//         expect(response.data).toMatchObject({ approval_status: "Pending" });
//       })
//       .catch((error) => {
//         console.log("error", JSON.stringify(error.response.data, null, 2));
//         expect(error.response.data).toMatchObject({
//           message: "Unauthenticated.",
//           name: ["The given data was invalid."],
//         });
//       });
//     // fetchMock.restore();
//     return apiResult;
//   });
// });

// describe("Update Business Info", () => {
//   it("api test for updating user info", () => {
//     const apiResult = axios({
//       url: `https://api.devoa.optimizeapp.com/api/business/${2}`,
//       method: "PATCH",
//       data: {
//         name: "Updated Business name",
//         type: "SME",
//         country_id: "Dean",
//         mobile: "+96566645464",
//       },
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI4MDY1Mjk5LCJleHAiOjE2MjgxMDEyOTksIm5iZiI6MTYyODA2NTI5OSwianRpIjoiUUJVNlBYMnRySXFoVk8zQiIsInN1YiI6MTIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.9peiima05QRClpI625sDpGNf2GihgbchjYK1WnrVnSM",
//       },
//     })
//       .then((response) => {
//         console.log("Update User business response", response.data);
//         expect(response.data).toMatchObject({ approval_status: "Pending" });
//       })
//       .catch((error) => {
//         console.log("error", JSON.stringify(error.response.data, null, 2));
//         expect(error.response.data).toMatchObject({
//           message: "Unauthenticated.",
//           name: ["The given data was invalid."],
//         });
//       });
//     // fetchMock.restore();
//     return apiResult;
//   });
// });
