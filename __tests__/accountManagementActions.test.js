import axios from "axios";

describe("Create Business Account", () => {
  it("api test for create business account", () => {
    const apiResult = axios({
      url: "https://api.devoa.optimizeapp.com/api/business",
      method: "POST",
      data: {
        name: "Construction Co",
        category: "Construction",
        country_id: 2,
        type: "Agency",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5kZXZvYS5vcHRpbWl6ZWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjI3ODk1OTEwLCJleHAiOjE2Mjc5MzE5MTAsIm5iZiI6MTYyNzg5NTkxMCwianRpIjoiUTk1Y2VUak1WdmZNNnU3SiIsInN1YiI6MTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.09N6HRMZUR_oN5L6MrnSy9yww6OV1Tld2dQ31RmUyec",
      },
    })
      .then((response) => {
        console.log("Create Business Account response", response.data);
        expect(response.data).toMatchObject({ approval_status: "Pending" });
      })
      .catch((error) => {
        console.log("error", error.response);
        expect(error.response.data).toMatchObject({
          message: "Unauthenticated.",
          name: ["The name has already been taken."],
        });
      });
    // fetchMock.restore();
    return apiResult;
  });
});
