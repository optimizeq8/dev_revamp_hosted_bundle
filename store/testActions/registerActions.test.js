// import { registerGuestUser } from "../actions";
// import fetchMock from "fetch-mock";
// test("Register User", () => {
//   const testData = { id: "1" };
//   fetchMock.get("*", testData);

//   const apiResult = registerGuestUser({
//     email: "someUser@OptimizeApp.com",
//     password: "SUPERVERYSTRONGPASSWORDYOLOWASSUPIMSUPASTRONG",
//     password_confirmation: "SUPERVERYSTRONGPASSWORDYOLOWASSUPIMSUPASTRONG",
//     first_name: "Sam",
//     last_name: "Dean",
//     mobile: "+96566645464",
//   }).then((response) => {
//     console.log("response", response);
//     expect(response).toEqual(testData);
//   });
//   fetchMock.restore();
//   return apiResult;
// });
