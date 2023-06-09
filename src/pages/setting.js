import React from "react";
import { Typography } from "@mui/material";
import { MainLayout } from "../Layout/Pages_layout/mainLayout";
import Subadmin from "../component/Subadmin/subadmin";
const Setting = (props) => {
  const [listlegveg, setLegvg] = React.useState('')

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  const data = {
    title:listlegveg=="pl_PL"?"subadmin":"Subadmin",
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
