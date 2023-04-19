import { Grid } from "@mui/material";
import React from "react";
import ResponsiveDrawer from "../../component/user/newbarlist";
import Header from "../../component/user/header";
import styles from "../../styles/user/index.module.css";

export const MainLayout = ({ Content, data, props }) => {
  return (
    <Grid container spacing={0} className="mainDiv">
      <Grid
        xs={12}
        sm={4}
        md={3}
        lg={3}
        className="Gridcontainergrid"
        // style={{ border: "3px solid red" }}
      >
        <ResponsiveDrawer />
      </Grid>
      <Grid
        xs={12}
        sm={8}
        md={9}
        lg={9}
        className={styles.homepeg}
        // style={{ border: "3px solid blue" }}
      >
        <Header data={data} props={props} />
        {/* <Usercount props={props} /> */}
        <Content />
      </Grid>
    </Grid>
  );
};
