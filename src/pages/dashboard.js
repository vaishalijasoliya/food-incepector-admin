import Usercount from "../component/dashboard/home3contents";
import Nevbar from "../component/user/newbarlist";
import Header from "../component/user/header";
import styles from "../styles/user/index.module.css";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { Types } from "/src/constants/actionTypes";
import React from "react";
const Dashdata = (props) => {
  console.log(props, "Home");
  const [listlegveg, setLegvg] = React.useState('')

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  const data = {
    title: listlegveg=='pl_PL'?'لوحة القيادة':"Dashboard",
    // desc: istlegveg=='pl_PL'?'Panel':"Morning James, Welcome to Clever Gifts Dashboard ",
  };

  return (
    <>
      <Grid container spacing={0} className="mainDiv">
        <Grid xs={12} sm={4} md={3} lg={3} className="Gridcontainergrid">
          <Nevbar />
        </Grid>
        <Grid xs={12} sm={8} md={9} lg={9} className={styles.homepeg}>
          <Header data={data} props={props} />
          <Usercount props={props} />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashdata);
