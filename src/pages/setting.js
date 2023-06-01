import React from "react";
import { Typography } from "@mui/material";
import { MainLayout } from "../Layout/Pages_layout/mainLayout";
import Subadmin from "../component/Subadmin/subadmin";
const Setting = (props) => {
  const data = {
    title: "Subadmin",
  };

  return (
    <MainLayout
      data={data}
      Content={() => {
        return (
          <>
            <Subadmin props={props} />
          </>
        );
      }}
    />
  );
};

export default Setting;
