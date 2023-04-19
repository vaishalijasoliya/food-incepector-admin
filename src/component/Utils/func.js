import React from "react";
import { toast } from "react-toastify";

export const removeData = ({ logout }) => {
  localStorage.clear();
  // toast.success("Logged out.");
  logout();
};

export const convertToIndianMobileNumberFormat = (number) => {
  // Remove all blank spaces and special characters from the input number
  const digitsOnly = number.replace(/[\s+()-]/g, "");

  // Add the Indian country code (+91) to the beginning of the number
  const indianFormat = "91" + digitsOnly;

  // Return the formatted number
  return indianFormat;
};
