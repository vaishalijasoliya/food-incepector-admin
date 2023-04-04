import { Box, Typography } from "@mui/material";
import React from "react";
import MainStyles from "../styles/mainstyles.module.css";

export const Textstring = ({ Styles, text, fs, ta, mrgn, br, pr, clr, pd }) => {
  return (
    <Typography
      style={{
        fontSize: fs ? fs : null,
        textAlign: ta ? ta : null,
        margin: mrgn ? mrgn : null,
        borderRight: br ? br : null,
        paddingRight: pr ? pr : null,
        color: clr ? clr : null,
        padding: pd ? pd : null,
      }}
      className={Styles.Seventh_section_item_desc_txt}
    >
      {text}
    </Typography>
  );
};

export const Bold_text = ({ text, fs }) => {
  return (
    <Typography
      className={MainStyles.Bold_primary_txt}
      style={{ fontSize: fs ? fs : null }}
    >
      {text}
    </Typography>
  );
};

export const Description_text = ({ Styles, text, fs, clr, lh }) => {
  return (
    <Typography
      className={MainStyles.Discription_txt_}
      style={{
        fontSize: fs ? fs : "16px",
        color: clr ? clr : null,
        lineHeight: lh ? lh : 1.3,
      }}
    >
      {text}
    </Typography>
  );
};

export const Small_txt_bold = ({ text }) => {
  return <Typography className={MainStyles.Discription_txt}>{text}</Typography>;
};

export const Regular_bold = ({ text, clr, ta, fs }) => {
  return (
    <Typography
      style={{
        color: clr ? clr : "white",
        textAlign: ta ? ta : null,
        fontSize: fs ? fs : null,
      }}
      className={MainStyles.Regular_bold}
    >
      {text}
    </Typography>
  );
};

export const SemiBold = ({ text, clr, fs, lh }) => {
  return (
    <Typography
      className={MainStyles.Semibold_text}
      style={{
        fontSize: fs ? fs : null,
        color: clr ? clr : null,
        lineHeight: lh ? lh : 1.3,
      }}
    >
      {text}
    </Typography>
  );
};

export const Light_text = ({ text, fs, clr }) => {
  return (
    <Typography
      style={{ fontSize: fs ? fs : "16px", color: clr ? clr : "white" }}
      className={MainStyles.Light_text}
    >
      {text}
    </Typography>
  );
};

export const Input_error = ({ text }) => {
  return <Typography className={MainStyles.Error_text}>{text}</Typography>;
};

export const Link_text = ({ Styles, text, fs, clr, lh, onPress, ta }) => {
  return (
    <Typography
      className={MainStyles.Discription_txt_}
      style={{
        fontSize: fs ? fs : "16px",
        color: clr ? clr : null,
        lineHeight: lh ? lh : 1.3,
        textAlign: ta ? ta : null,
      }}
      onClick={onPress}
    >
      {text}
    </Typography>
  );
};

export const Head_text = ({ text, fs, clr }) => {
  return (
    <Typography
      className={MainStyles.Head_text}
      style={{ fontSize: fs ? fs : null, color: clr ? clr : "white" }}
    >
      {text}
    </Typography>
  );
};

export const Login_head = ({ text }) => {
  return <p className={MainStyles.signintxt}>{text}</p>;
};
