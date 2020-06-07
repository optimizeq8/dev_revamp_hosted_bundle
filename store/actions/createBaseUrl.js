import axios from "axios";
import store from "../index";
export default () => {
  const instance = axios.create({
    baseURL: store.getState().login.admin
      ? "https://optimizekwtestingserver.com/optimize/public/"
      : "https://www.optimizeapp.com/optimize/public/",
  });
  const responseHandler = (response) => {
    // console.log("responseHandler", response);
    if (response) {
      if (response.data && response.data.errorStatus === 401) {
        return Promise.reject(response.data);
      }
      return response;
    }
  };

  const errorHandler = (error) => {
    if (error) {
      // console.log("errorHandler", error);
      return Promise.reject(error);
    }
    return error;
  };

  instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
  );
  return instance;
};
