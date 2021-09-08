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

export let userUpdateSuccessResponse = {
  api_version: "v1",
  success: true,
  message: "User data updated",
  data: {
    id: 7,
    first_name: "user firstname",
    last_name: "user lastname",
    mobile: "+96554655465",
    email: "test@test.com",
    verified: true,
    tmp_pwd: false,
  },
};

export let userUnauthenticatedResponse = {
  api_version: "v1",
  error: true,
  message: "Validation Errors",
  data: {},
};
