import { Typography } from "@mui/material";
import React from "react";

export const InputLable = ({ Styles, fs, text, clr }) => {
  return (
    <p className="Input_lable_" style={{ color: clr ? clr : "#fff" }}>
      {text}
    </p>
  );
};
