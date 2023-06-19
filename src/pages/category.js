import React, { useState, useEffect } from 'react';
import Paymenttable from "../component/Payments/paymentslist";
import styles from "../styles/user/index.module.css";
import Grid from "@mui/material/Grid";
import { Types } from "../constants/actionTypes";
import { connect } from "react-redux";
import { MainLayout } from "../Layout/Pages_layout/mainLayout";
const Category = (props) => {
  const [listlegveg, setLegvg] = React.useState('')

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  const data = {
    title: listlegveg == 'pl_PL' ? "فئة" : "Category",
    // desc: "Morning James, Welcome to Clever Gifts Dashboard ",
  };
  return (
    <>
      <MainLayout
        data={data}
        Content={() => {
          return <Paymenttable props={props} />;
        }}
      />
      {/* <Grid container spacing={0} className="mainDiv">
        <Grid xs={12} sm={4} md={3} className="Gridcontainergrid">
          <Nevbar />
        </Grid>
        <Grid xs={12} sm={8} md={9} className="maenedit">
          <Header data={data} props={props} />
          <Paymenttable props={props} />
        </Grid>
      </Grid> */}
    </>
  );
};
export default Category;
