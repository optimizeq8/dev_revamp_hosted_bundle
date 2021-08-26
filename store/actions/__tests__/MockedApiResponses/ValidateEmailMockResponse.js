export let validateEmailSuccessMockResponse = {
  api_version: "v1",
  success: true,
  message: "Email is allowed for registration",
  data: null,
};

export let validateEmailFailureMockResponse = {
  api_version: "v1",
  error: true,
  message: "Email is already registered",
  data: null,
};
export let validateEmailMissingeMailFailureMockResponse = {
  api_version: "v1",
  error: true,
  message: "",
  data: {
    error_message: [],
    line: 43,
    file: "/var/www/vendor/laravel/framework/src/Illuminate/Routing/AbstractRouteCollection.php",
  },
};
