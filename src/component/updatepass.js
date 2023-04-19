import style from "../styles/login.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, TextField, Button } from "@mui/material";
import { Container, height, width } from "@mui/system";
import { useRouter } from "next/router";
import ApiServices from "../config/ApiServices";
import ApiEndpoint from "../config/ApiEndpoint";
import { toast } from "react-toastify";
import { Button_ } from "../Layout/buttons";

const Newpass = (props) => {
  const router = useRouter();
  const onCreatePassword = async () => {
    var body = {
      user_name: formik.values.newPassword,
      password: formik.values.reTypePassword,
    };
    var headers = {
      "Content-Type": "application/json",
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.LOGIN_USER,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message);
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      reTypePassword: "",
    },

    validationSchema: Yup.object({
      newPassword: Yup.string().min(8).required("Password is required"),
      reTypePassword: Yup.string()
        .min(8)
        .required("Repassword is required")
        .oneOf([Yup.ref("newPassword")], "Passwords does not match."),
    }),
    onSubmit: () => {
      onCreatePassword();
    },
  });

  return (
    <>
      <div className={style.singin}>
        <Box>
          <Container sx={{ width: "100%", padding: "0px!important" }}>
            <p className={style.cypasstxt}>Creat new password</p>
            <p className={style.cypasssmltxt}>
              Your password must be different from previous used password.
            </p>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="newPassword"
                lable="New Password"
                placeholder="New Password"
                className={style.passinput}
                type="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                error={Boolean(
                  formik.touched.newPassword && formik.errors.newPassword
                )}
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                style={{
                  margin: "0px",
                }}
              />

              <TextField
                name="reTypePassword"
                lable="Re-Type Password"
                placeholder="Re-Type Password"
                className={style.passinput}
                type="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.reTypePassword}
                error={Boolean(
                  formik.touched.reTypePassword && formik.errors.reTypePassword
                )}
                helperText={
                  formik.touched.reTypePassword && formik.errors.reTypePassword
                }
              />
              {/* <Button_ type={"submit"} text={"Set Password"} /> */}
              {/* <a href='./index'> */}
              <Button type="submit" className={style.submitbtn}>
                Set Password{" "}
              </Button>
            </form>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default Newpass;
