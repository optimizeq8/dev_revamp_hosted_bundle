export let userRegisterSuccessResponse = {
  api_version: "v1",
  success: true,
  message: "User Created",
  data: [
    {
      first_name: "Sam",
      last_name: "Dean",
      mobile: "+96566645464",
      email: "testuser@pptimizeapp.com",
      id: 1,
      roles: "[]",
    },
  ],
};

export let userRegisterFailureresponse = {
  api_version: "v1",
  error: true,
  message: "Validation Errors",
  data: {},
};
