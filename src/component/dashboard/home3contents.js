import { Grid, Box, LinearProgress } from "@mui/material";
import style from "../../styles/dashboard.module.css";

import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import React, { useContext } from "react";
import SupportContext from "../../context/SupportContext";

const Usercount = (props) => {
  const [signupCount, setSignupCount] = React.useState(0);
  const [activeCount, setActiveCount] = React.useState(0);
  const [inactiveCount, setInactiveCount] = React.useState(0);
  const { activeSupportId, setActiveSupportId, setActiveSupportObject } =
    useContext(SupportContext);

  const handleClick = (id = string, data = object) => {
    viewSupportMsg(key);
    setUserData(data);
  };

  const usercountlist = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };

    props.props.loaderRef(true);
    const data = await ApiServices.GetApiCall(
      ApiEndpoint.USER_COUNT_LIST,
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        setActiveCount(data.activeUser);
        setInactiveCount(data.inactiveUser);
        setSignupCount(data.signUpUser);
      }
    }
  };

  return (
    <>
      <Grid container spacing={4} style={{ flexWrap: "wrap" }}>
        <Grid item xs={12} md={4} className={style.topgrid}>
          <Box className={style.singdiv}>
            <Box>
              <div className={style.threeuser}>
                <img src="./image/3 User.svg" />
              </div>
              <p className={style.signnum}>{signupCount} </p>
              <p className={style.signtxt}>Sign Up Users</p>
            </Box>
            <Box
              sx={{ width: "153px", color: "red" }}
              className={style.signuserbox}
            >
              <LinearProgress
                variant="determinate"
                value={80}
                height="8"
                className={style.signuser}
                id={style.linegrf}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className={style.topgrid}>
          <Box className={style.singdiv2}>
            <Box>
              <Box>
                <div className={style.myprofile}>
                  <img src="./image/myprofile.svg" />
                </div>
              </Box>
              <p className={style.signnum}> {activeCount} </p>
              <p className={style.signtxt}>Active Users</p>
            </Box>
            {/* <Box> */}
            <Box sx={{ width: "153px", color: "#F9B8A5" }}>
              <LinearProgress
                variant="determinate"
                value={50}
                height="8"
                className={style.activeuser}
                id={style.linegrf}
              />
            </Box>
            {/* </Box> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className={style.topgrid}>
          <Box className={style.singdiv3}>
            <Box>
              <Box>
                <div className={style.mypinkprofile}>
                  <img src="./image/mypinkprofile.svg" />
                </div>
              </Box>
              <p className={style.signnum}> {inactiveCount} </p>
              <p className={style.signtxt}>Inactive Users</p>
            </Box>

            <Box sx={{ width: "153px", color: "#FFC1D3" }}>
              <LinearProgress
                variant="determinate"
                value={40}
                height="8"
                className={style.inactiveuser}
                id={style.linegrf}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Usercount;
