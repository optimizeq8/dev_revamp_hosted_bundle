export let changePasswordSuccessResponse = {
  api_version: "v1",
  success: true,
  message: "Password Updated",
  data: {
    id: 14,
    first_name: "Saadiya",
    last_name: "Kazi",
    mobile: "+96522112290",
    email: "saadiya@optimizeapp.com",
    verified: 0,
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
