import style from "../styles/login.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, TextField } from "@mui/material";
import { Container, height, width } from "@mui/system";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Phone from "./phone";
import { useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const Mobile = (props) => {
  const router = useRouter();
  const onSubmitPress = async () => {
    // var body = {
    //   phone: formik.values.phone,
    //   // 'password': formik.values.password
    // };
    // var headers = {
    //   "Content-Type": "application/json",
    // };
    // var data = (JSON.stringify(body), headers);
  };

  return (
    <>
      <div className={style.singin}>
        <Box>
          <Container sx={{ width: "100%", padding: "0px!important" }}>
            <p className={style.cypasstxt}>Continue with phone</p>
            <p className={style.cypasssmltxt}>
              You’ll receive 4 digit code to verify next.
            </p>
            <Phone props={props.props} />
          </Container>
        </Box>
      </div>
    </>
  );
};

export default Mobile;
