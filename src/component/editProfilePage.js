import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import Styles from "../styles/user/index.module.css";
import { InputLable } from "../Layout/inputlable";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input_error } from "../Layout/textString";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export const Edit_profilePage = () => {
  const [userProfileImage, setUserProfileImage] = React.useState("");
console.log(userProfileImage , 'userProfileImage__________')
  const formik = useFormik({
    initialValues: {
      userName: "",
      mobileNumber: "",
    },

    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required."),
      mobileNumber: Yup.string().required("Mobile number is required."),
    }),
    onSubmit: () => {
      console.log("submitted");
    },
  });
  const uploadItem = async (e) => {
    var filename = e.target.files[0];
    if (e.target.files[0]) {
      setUserProfileImage(URL.createObjectURL(filename));
    }
  };

  return (
    <Box className={Styles.homepeg} style={{ padding: "0", overflow: "auto" }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container className={Styles.profile_container}>
          <Grid
            sm={11}
            xs={11}
            md={9}
            xl={9}
            lg={9}
            item
            className={Styles.profile_item}
          >
            <div className={Styles.profile_image_div}>
              <Box className={Styles.Image_user_item_div}>
                <Box className={Styles.Profile_photo_div}>
                  <Avatar
                    className={Styles.Profile_photo_avtar}
                    alt="user profile photo"
                    src={userProfileImage}
                  />
                </Box>

                <IconButton className={Styles.Change_profile_icon_btn}>
                  <input type="file" name="myImage" onChange={uploadItem} />
                  <AddRoundedIcon />
                </IconButton>
              </Box>
            </div>
            <Box className={Styles.Input_box}>
              <InputLable text={"Username"} clr={"black"} />
              <TextField
                className={Styles.Input_field}
                name="userName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.userName}
              />
              <Box className={Styles.error_text_view}>
                {formik.errors.userName && formik.touched.userName && (
                  <Input_error text={formik.errors.userName} />
                )}
              </Box>
            </Box>
            <Box className={Styles.Input_box}>
              <InputLable text={"Mobile number"} clr={"black"} />
              <TextField
                className={Styles.Input_field}
                name="mobileNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mobileNumber}
              />
              <Box className={Styles.error_text_view}>
                {formik.errors.mobileNumber && formik.touched.mobileNumber && (
                  <Input_error text={formik.errors.mobileNumber} />
                )}
              </Box>
            </Box>
            <Box style={{ flexDirection: "row" }} className={Styles.Input_box}>
              <Button className={Styles.Submit_btn} type="submit">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
