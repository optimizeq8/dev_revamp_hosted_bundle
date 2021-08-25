export let changePasswordSuccessResponse = {
  api_version: "v1",
  success: true,
  message: "Password Updated",
  data: {
    id: 11,
    first_name: "Imran",
    last_name: "Sheikh",
    mobile: "+96522112288",
    email: "imran@optimizeapp.com",
    verified: 1,
    tmp_pwd: 0,
  },
};

export let changePasswordFailureResponse = {
  api_version: "v1",
  error: true,
  message: "Validation Errors",
  data: {
    password: ["Incorrect current password"],
  },
};
