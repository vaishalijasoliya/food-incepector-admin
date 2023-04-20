import Constants from "./Constants";

export default {
  LOGIN_USER: Constants.BASE_API_URL + "user/login",
  FORGET_PASSWORD: Constants.BASE_API_URL + "user/resendcode",
  VERIFY_OTP: Constants.BASE_API_URL + "user/verifycode",
  CREATE_PASSWORD: Constants.BASE_API_URL + "",
  EDIT_CATEGORY: Constants.BASE_API_URL + "category/edit",
  DELETE_CATEGORY: Constants.BASE_API_URL + "category/delete",
  ADD_CATEGORY: Constants.BASE_API_URL + "category/add",
  CATEGORY_LIST: Constants.BASE_API_URL + "category/list",
  VIEW_CATEGORY: Constants.BASE_API_URL + "category/view",
  ADD_QUESTION: Constants.BASE_API_URL + "",
  EDIT_QUESTION: Constants.BASE_API_URL + "",
  DELETE_QUESTION: Constants.BASE_API_URL + "",
  ADD_LOCATION: Constants.BASE_API_URL + "",
  EDIT_LOCATION: Constants.BASE_API_URL + "",
  DELETE_LOCATION: Constants.BASE_API_URL + "",
  ADD_AUDITOR: Constants.BASE_API_URL + "user/register",
  EDIT_AUDITOR: Constants.BASE_API_URL + "user/auditor/edit",
  VIEW_AUDITOR: Constants.BASE_API_URL + "user/auditor/view",
  DELETE_AUDITOR: Constants.BASE_API_URL + "user/auditor/delete",
  AUDITOR_LIST: Constants.BASE_API_URL + "user/auditor/list",
};
