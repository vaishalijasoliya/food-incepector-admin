import React from "react";
import styles from "../styles/mainstyles.module.css";
import { Button } from "@mui/material";

export const Button_ = ({ handleClick, text, type }) => {
  return (
    <Button
      className={styles.btn_same}
      type={type ? type : "button"}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};
