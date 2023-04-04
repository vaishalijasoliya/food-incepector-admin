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
import { Typography } from "@material-ui/core";

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

const drawerWidth = 240;
const home = (props) => {
  const router = useRouter();
  const [com, setCom] = React.useState(false);
  const [active, setActive] = useState("");
  const [advertiseMent, setAdvertisement] = React.useState("");
  var handleClickOpenCom = (myprops) => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
    myprops = { advertiseMent };
  };
  var handleClickOpenCom = (myprops) => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
    myprops = { advertiseMent };
  };
  const handleCloseCom = () => {
    setCom(false);
  };
  var currentPath = router.pathname;

  const buttons = [
    <Button
      className={currentPath == "/dashboard" ? styles.active : ""}
      id={styles.butgri}
      onClick={() => {
        router.push("./dashboard"), setActive("dashboard");
      }}
    >
      <span>Dashboard</span>
    </Button>,
    <Button
      onClick={() => {
        router.push("./inspectorList");
      }}
      id={styles.butgri}
      variant="outlined"
      className={currentPath == "/inspectorList" ? styles.active : ""}
    >
      <span>inspector</span>
    </Button>,
    <Button
      onClick={() => {
        router.push("./category");
      }}
      className={currentPath == "/category" ? styles.active : ""}
      key="one"
      variant="outlined"
      id={styles.butgri}
    >
      <span>Catergory</span>
    </Button>,
    <Button
      onClick={() => {
        router.push("./hotelList");
      }}
      className={currentPath == "/hotelList" ? styles.active : ""}
      key="one"
      variant="outlined"
      id={styles.butgri}
    >
      <span>Hotel</span>
    </Button>,
    // <Button
    //   onClick={() => {
    //     router.push("./promotion");
    //   }}
    //   className={currentPath == "/promotion" ? styles.active : ""}
    //   key="one"
    //   variant="outlined"
    //   id={styles.butgri}
    // >
    //   <span>Questions</span>
    // </Button>,
    <Button
      variant="outlined"
      type="button"
      id={styles.butgri}
      onClick={handleClickOpenCom}
    >
      {/* <CameraFrontIcon className={styles.iconside} /> */}
      <span> Logout </span>
    </Button>,
  ];
  return (
    <>
      <Grid container className={styles.cantenar2}>
        <Grid item xs={12} className={styles.newbar}>
          <div style={{ margin: "0 auto" }} className={styles.logopedii}>
            <img
              alt="Remy Sharp"
              src="./image/admnlogo.png"
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
                md={
                  {
                    // borderRadius: '7px'
                  }
                }
                // fullWidth
                maxWidth="md"
              >
                <div>
                  <DialogContent className={styles.popupcasdfntenar}>
                    <div className={styles.lgtextout}>
                      <Typography>Logout</Typography>
                    </div>
                    <div className={styles.areypulisfg}>
                      <Typography>Are you sure you want to logout</Typography>
                    </div>
                    <div className={styles.btn2yesno}>
                      <Button
                        className={styles.yesbtnlisggs2}
                        onClick={handleCloseCom}
                      >
                        No
                      </Button>
                      <Button
                        className={styles.yesbtnlisggs}
                        onClick={() => {
                          var profile = "";
                          props.save_user_data({ user: "" });
                          router.push("/");
                          toast.success("Logout Successfully!");
                        }}
                      >
                        Yes
                      </Button>
                    </div>
                    {/* <Popupform props={props} advCreate={advCreate} closePop={handleCloseCom} userId={advId} /> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(home);
