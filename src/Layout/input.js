import { Box, TextField } from "@mui/material";
import React from "react";
import { InputLable } from "./inputlable";

export const InputField = ({
  onChange,
  lable,
  placeholder,
  name,
  errors,
  onBlur,
}) => {
  return (
    <>
      <InputLable text={lable} />
      <TextField
        id="outlined-basic"
        placeholder={placeholder}
        className={"Input_field"}
        variant="outlined"
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      />
      <Box>
        {errors ? (errors.name ? errors.name : "") : ""}

        {/* {errors.name && touched.name && <Input_error text={errors.name} />} */}
      </Box>
    </>
  );
};
