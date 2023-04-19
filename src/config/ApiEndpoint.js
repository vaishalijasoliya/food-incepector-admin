import Constants from "./Constants";

export default {
  LOGIN_USER: Constants.BASE_API_URL + "user/login",
  FORGET_PASSWORD: Constants.BASE_API_URL + "user/resendcode",
  VERIFY_OTP: Constants.BASE_API_URL + "user/verifycode",
  CREATE_PASSWORD: Constants.BASE_API_URL + "",
  INSPECTOR_LIST: Constants.BASE_API_URL + "Pattern/list",
  EDIT_CATEGORY: Constants.BASE_API_URL + "",
  DELETE_CATEGORY: Constants.BASE_API_URL + "",
  ADD_CATEGORY: Constants.BASE_API_URL + "",
  CATEGORY_LIST: Constants.BASE_API_URL + "",
  ADD_QUESTION: Constants.BASE_API_URL + "",
  EDIT_QUESTION: Constants.BASE_API_URL + "",
  DELETE_QUESTION: Constants.BASE_API_URL + "",
  ADD_LOCATION: Constants.BASE_API_URL + "",
  EDIT_LOCATION: Constants.BASE_API_URL + "",
  DELETE_LOCATION: Constants.BASE_API_URL + "",
};
