import styles from "../../styles/user/newbar.module.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { Types } from "../../../src/constants/actionTypes";
import { toast } from "react-toastify";
// import { useRouter } from 'next/router';
import { useState } from "react";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button_ } from "../../Layout/buttons";
import { Typography } from "@mui/material";
import { removeData } from "../Utils/func";

const Home = (props) => {
  const router = useRouter();
  const [com, setCom] = React.useState(false);
  const [active, setActive] = useState("");
  const [listlegveg, setLegvg] = React.useState("");
  console.log(props, "is____props_____");

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language");
    setLegvg(listtebal);
  }, []);
  var handleClickOpenCom = (myprops) => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
  };
  var handleClickOpenCom = (myprops) => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
  };
  const handleCloseCom = () => {
    setCom(false);
  };
  var currentPath = router.pathname;

  const buttons = [
    <Button
      className={currentPath == "/dashboard" ? styles.active : ""}
      id={styles.butgri}
      key={1}
      onClick={() => {
        router.push("./dashboard"), setActive("dashboard");
      }}
    >
      <span>{listlegveg == "pl_PL" ? "لوحة القيادة" : "Dashboard"}</span>
    </Button>,
    <Button
      onClick={() => {
        router.push("./inspectorList");
      }}
      id={styles.butgri}
      variant="outlined"
      key={2}
      className={currentPath == "/inspectorList" ? styles.active : ""}
    >
      <span>{listlegveg == "pl_PL" ? "قائمة المراجعين" : "Auditors list"}</span>
    </Button>,
    <Button
      onClick={() => {
        router.push("./category");
      }}
      key={3}
      className={currentPath == "/category" ? styles.active : ""}
      // key="one"
      variant="outlined"
      id={styles.butgri}
    >
      <span>{listlegveg == "pl_PL" ? "فئة" : "Category"}</span>
    </Button>,
    <Button
      onClick={() => {
        router.push("./questions");
      }}
      className={currentPath == "/questions" ? styles.active : ""}
      key="one"
      variant="outlined"
      id={styles.butgri}
    >
      <span>{listlegveg == "pl_PL" ? "أسئلة" : "Questions"}</span>
    </Button>,
    <Button
      onClick={() => {
        router.push("./hotelList");
      }}
      key={4}
      className={currentPath == "/hotelList" ? styles.active : ""}
      // key="one"
      variant="outlined"
      id={styles.butgri}
    >
      <span>{listlegveg == "pl_PL" ? "المواقع" : "Locations"}</span>
    </Button>,

    <Button
      onClick={() => {
        router.push("./audit");
      }}
      key={6}
      className={currentPath == "/audit" ? styles.active : ""}
      // key="one"
      variant="outlined"
      id={styles.butgri}
    >
      <span>{listlegveg == "pl_PL" ? "قائمة المراجعة" : "Audit list"}</span>
    </Button>,
    <Button
      sx={{
        display: props?.profile?.data?.user_name == "admin" ? "flex" : "none",
      }}
      onClick={() => {
        router.push("./setting");
      }}
      key={6}
      className={currentPath == "/setting" ? styles.active : ""}
      // key="one"
      variant="outlined"
      id={styles.butgri}
    >
      <span>{listlegveg == "pl_PL" ? "جلسة" : "Setting"}</span>
    </Button>,

    <Button
      variant="outlined"
      type="button"
      key={5}
      id={styles.butgri}
      onClick={handleClickOpenCom}
    >
      {/* <CameraFrontIcon className={styles.iconside} /> */}
      <span>{listlegveg == "pl_PL" ? "تسجيل خروج" : "Logout"}</span>
    </Button>,
  ];

  const logout = () => {
    router.push("/");
    props.save_user_data({ user: "" });
  };

  return (
    <>
      <Grid container className={styles.cantenar2}>
        <Grid item xs={12} className={styles.newbar}>
          <div style={{ margin: "0 auto" }} className={styles.logopedii}>
            <img
              alt="Remy Sharp"
              src="./image/favicon.png"
              className={styles.lianpohot}
            />
          </div>
          <Box className={styles.btnhoime}>
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical outlined button group"
              className={styles.newbtnrow}
            >
              {buttons}
            </ButtonGroup>
            <div>
              <Dialog
                open={com}
                onClose={handleCloseCom}
                className={styles.borderredayasfor}
                maxWidth="md"
              >
                <div>
                  <DialogContent className={styles.popupcasdfntenar}>
                    <div className={styles.lgtextout}>
                      <Typography>
                        {listlegveg == "pl_PL" ? "تسجيل خروج" : "Logout"}
                      </Typography>
                    </div>
                    <div className={styles.areypulisfg}>
                      <Typography>
                        {listlegveg == "pl_PL"
                          ? "هل أنت متأكد أنك تريد تسجيل الخروج"
                          : "Are you sure you want to logout"}
                      </Typography>
                    </div>
                    <div className={styles.btn2yesno}>
                      <Button_
                        text={listlegveg == "pl_PL" ? "لا" : "No"}
                        handleClick={handleCloseCom}
                      />
                      <Button_
                        text={listlegveg == "pl_PL" ? "نعم" : "Yes"}
                        handleClick={() => {
                          removeData({ logout: logout });
                          // var profile = "";
                          // props.save_user_data({ user: "" });
                          // router.push("/");
                          // toast.success("Logout Successfully!");
                        }}
                      />
                    </div>
                  </DialogContent>
                </div>
              </Dialog>
            </div>
          </Box>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
