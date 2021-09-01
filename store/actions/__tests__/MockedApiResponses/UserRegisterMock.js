export let userRegisterSuccessResponse = {
  api_version: "v1",
  success: true,
  message: "User Created",
  data: {
    access_token: "kajsdfkjasdlkfsakdjf",
    token_type: "bearer",
    expires_in: 36000,
  },
};

export let userRegisterFailureresponse = {
  api_version: "v1",
  error: true,
  message: "Validation Errors",
  data: { mobile: ["The mobile has already been taken."] },
};
