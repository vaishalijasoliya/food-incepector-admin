import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import style from "../styles/login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Types } from "../constants/actionTypes";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import ApiServices from "../config/ApiServices";
import ApiEndpoint from "../config/ApiEndpoint";
import { toast } from "react-toastify";

const Signin = (props) => {
  const router = useRouter();

  const onLoginPress = async () => {
    // router.push("/dashboard");
    var body = {
      user_name: formik.values.username,
      password: formik.values.password,
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
        props.save_user_data({ user: data });
        toast.success("Logged In Succesfully");
        router.push("/dashboard");
      } else {
        // setErrorShow(true)
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      onLoginPress();
    },
  });

  return (
    <div className={style.singin}>
      <Box>
        <p className={style.signintxt}>Sign in</p>
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
          <button
            type="button"
            onClick={() => {
              router.push("./forgotPassword");
            }}
            className={style.frgttxt}
          >
            Forgot password?
          </button>

          <button type="submit" className={style.submitbtn}>
            Sign in
          </button>
          {/* <button
            type="button"
            onClick={() => {
              router.push("./register");
            }}
            className={style.frgttxt}
          >
            New user?
          </button> */}
        </form>
      </Box>
    </div>
    // {/* </Box> */ }
    // </Box>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
