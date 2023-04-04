import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import style from "../styles/login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Types } from "../constants/actionTypes";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Login_head } from "../Layout/textString";

const Item = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  textAlign: "center",
}));

const Register_page = (props) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
      rePassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords does not match."),
    }),
    onSubmit: () => {
      router.push("/");
    },
  });

  return (
    <div className={style.singin}>
      <Login_head text={"Sign up"} />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(formik.touched.username && formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          name="username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
          lable="Username"
          placeholder="Username"
          className={style.userinput}
          type="text"
          style={{
            margin: "0px",
          }}
        />

        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          lable="Password"
          placeholder="Password"
          className={style.userinput}
          type="password"
        />
        <TextField
          error={Boolean(formik.touched.rePassword && formik.errors.rePassword)}
          helperText={formik.touched.rePassword && formik.errors.rePassword}
          name="rePassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.rePassword}
          lable="Password"
          placeholder="Password"
          className={style.userinput}
          type="password"
        />

        <button type="submit" className={style.singbtn}>
          Sign up
        </button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register_page);
