export let forgotPasswordSuccessMockResponse = {
  api_version: "v1",
  success: true,
  message: "We have e-mailed your password reset link!",
  data: {
    reset_request_exist: true,
  },
};

export let forgotPasswordFailureMockResponse = {
  api_version: "v1",
  error: true,
  message: "Reset password error",
  data: { email: ["We can't find a user with that e-mail address."] },
};

export let forgotPasswordMissingEmailFailureMockResponse = {
  api_version: "v1",
  error: true,
  message: "Validation Errors",
  data: { email: ["The email field is required."] },
};
