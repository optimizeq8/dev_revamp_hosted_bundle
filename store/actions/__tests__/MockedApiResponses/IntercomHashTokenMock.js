export let intercomHashSuccessResponse = {
  api_version: "v1",
  success: true,
  message: "Hashed Data",
  data: {
    android: "971eed707846b6e43d08ad7557f7d2200bb7312d4f3ca2a971d9589340f2d06b",
    ios: "e902ecf4da6201daee14caf0078549898bbf257ecb046c6049b50a5e70b4c912",
  },
};

export let intercomHashFailureResponse = {
  api_version: "v1",
  error: true,
  message: "Unauthenticated",
  data: {},
};
