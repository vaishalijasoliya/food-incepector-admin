import styles from "../../styles/user/hedar.module.css";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Nevbar = (props) => {
  const [userCount, setUserCount] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  // console.log(props, "myprops");

  // const getCountuser = async () => {
  //   console.log(props, "myusercount");
  //   var headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": props.props.profile.token,
  //   };
  //   var data = await ApiServices.GetApiCall(
  //     ApiEndpoint.USER_NOTIFICATION_COUNT,
  //     headers
  //   );
  //   if (!!data) {
  //     if (data.status == true) {
  //       setUserCount(data.data);
  //     } else {
  //     }
  //   } else {
  //   }
  //   console.log(userCount, "pending");
  // };

  // stockInterval = setInterval(() => {
  //   getCountuser();
  // }, 3000);

  // React.useLayoutEffect(() => {
  //   return () => {
  //     if (!!stockInterval) {
  //       clearInterval(stockInterval);
  //     }
  //   };
  // }, []);

  // React.useEffect(() => {
  //   getCountuser();
  // }, []);

  // const onHandleclick = () => {
  //   router.push("./notification");
  // };

  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={styles.maencontainer}
      >
        <Grid className={styles.textheging} item xs={12} md={6}>
          <Typography
            gutterBottom
            component="div"
            className={styles.hedingh3}
          >
            {props.data.title}
          </Typography>
        </Grid>
        <Grid item xs={12} className={styles.img2} md={6}>
          <button
            className={styles.pohotloho1}
            onClick={handleClick}
          >
            <Avatar
              alt="Profile Picture"
              src={"./image/image 3.png"}
              className={styles.pohotloho}
            />
          </button>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              className={styles.Menu_item}
              onClick={() => {
                router.push("/editprofile");
                handleClose();
              }}
            >
              <AccountCircleIcon />
              {/* <Avatar /> */}
              profile
            </MenuItem>
            <MenuItem
              className={styles.Menu_item}
              onClick={() => {
                router.push("/");
                handleClose();
              }}
            >
              <LogoutIcon color="action" /> Logout
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
};
// const mapStateToProps = (state) => ({
//   profile: state.user.profile,
// });

// const mapDispatchToProps = (dispatch) => ({
//   save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
// });
export default Nevbar;
