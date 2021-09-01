export let OtpSentSuccessResponse = {
  api_version: "v1",
  success: true,
  message: "Your OTP is sent",
  data: null,
};

export let OtpSentFailureResponse = {
  api_version: "v1",
  error: true,
  message: "Unauthenticated.",
  data: {},
};
