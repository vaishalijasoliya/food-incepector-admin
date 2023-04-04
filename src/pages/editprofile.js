import { Box, Grid } from "@mui/material";
import React from "react";
import ResponsiveDrawer from "../component/user/newbarlist";
import Header from "../component/user/header";
import { MainLayout } from "../Layout/Pages_layout/mainLayout";
import { Edit_profilePage } from "../component/editProfilePage";

const data = {
  title: "Profile",
};

const Edit_profile = (props) => {
  return <MainLayout data={data} props={props} Content={Edit_profilePage} />;
};

export default Edit_profile;
