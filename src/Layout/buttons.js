import React from "react";
import styles from "../styles/mainstyles.module.css";
import { Button } from "@mui/material";

export const Button_ = ({ handleClick, text }) => {
  return (
    <Button className={styles.btn_same}  onClick={handleClick}>
      {text}
    </Button>
  );
};
