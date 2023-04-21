import Constants from "./Constants";

export default {
  LOGIN_USER: Constants.BASE_API_URL + "user/login",
  FORGET_PASSWORD: Constants.BASE_API_URL + "user/resendcode",
  VERIFY_OTP: Constants.BASE_API_URL + "user/verifycode",
  CREATE_PASSWORD: Constants.BASE_API_URL + "",
  // CATEGORYS
  EDIT_CATEGORY: Constants.BASE_API_URL + "category/edit",
  DELETE_CATEGORY: Constants.BASE_API_URL + "category/delete",
  ADD_CATEGORY: Constants.BASE_API_URL + "category/add",
  CATEGORY_LIST: Constants.BASE_API_URL + "category/list",
  VIEW_CATEGORY: Constants.BASE_API_URL + "category/view",
  // QUESTIONS
  ADD_QUESTION: Constants.BASE_API_URL + "question/add",
  EDIT_QUESTION: Constants.BASE_API_URL + "question/edit",
  DELETE_QUESTION: Constants.BASE_API_URL + "question/delete",
  GET_QUESTION: Constants.BASE_API_URL + "question/list",
  VIEW_QUESTION: Constants.BASE_API_URL + "question/view",
  // LOCATIONS
  ADD_LOCATION: Constants.BASE_API_URL + "location/add",
  EDIT_LOCATION: Constants.BASE_API_URL + "",
  DELETE_LOCATION: Constants.BASE_API_URL + "",
  LOCATION_LIST: Constants.BASE_API_URL + "location/list",
  // AUDITORS
  ADD_AUDITOR: Constants.BASE_API_URL + "user/register",
  EDIT_AUDITOR: Constants.BASE_API_URL + "user/auditor/edit",
  VIEW_AUDITOR: Constants.BASE_API_URL + "user/auditor/view",
  DELETE_AUDITOR: Constants.BASE_API_URL + "user/auditor/delete",
  AUDITOR_LIST: Constants.BASE_API_URL + "user/auditor/list",
};
