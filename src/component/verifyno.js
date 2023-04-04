import style from "../styles/login.module.css";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import App from "./otp";
import { useRouter } from "next/router";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Verify = (props) => {
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState(0);
  const [idUser, setIdUser] = useState(0);

  useEffect(() => {
    if (!!router.query && !!router.query.mobile) {
      setMobileNo(router.query.mobile);
      setIdUser(router.query.id);
    }
  }, [router.isReady]);

  return !!mobileNo ? (
    <div className={style.singin}>
      <p className={style.verifytxt}>Verify Your Phone</p>
      <p className={style.verifysmltxt}>Verification code sent to your phone</p>
      <p
        className={style.verifysmltxt}
        style={{
          paddingTop: "0px",
        }}
      >
        {" "}
        +{mobileNo.slice(0, mobileNo.length - 10)}{" "}
        {mobileNo.slice(mobileNo.length - 10, mobileNo.length - 7)}{" "}
        {mobileNo.slice(mobileNo.length - 7, mobileNo.length - 4)}{" "}
        {mobileNo.slice(mobileNo.length - 4, mobileNo.length)}
      </p>
      <form>
        <App props={props.props} id={idUser} />
      </form>
    </div>
  ) : (
    ""
  );
};

export default Verify;
