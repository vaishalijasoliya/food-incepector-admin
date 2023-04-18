import { Box, TextField } from "@mui/material";
import React from "react";
import { InputLable } from "./inputlable";

export const InputField = ({
  onChange,
  lable,
  placeholder,
  name,
  error,
  onBlur,
  value,
}) => {

  console.log(error ,'is____error')


  const arr = error

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
        value={value}
      />
      <Box>
        {/* {typeof error == "string" ? myArray.includes(name) ? error ==  : null} */}
      </Box>
    </>
  );
};
