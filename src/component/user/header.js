import styles from "../../styles/user/hedar.module.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { Types } from "../../../src/constants/actionTypes";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
let stockInterval = null;


const Nevbar = (props) => {
  const [userCount, setUserCount] = React.useState(0);

  console.log(userCount, "myuser");
  const router = useRouter();
  console.log(props, "myprops");

  const getCountuser = async () => {
    console.log(props, "myusercount");
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var data = await ApiServices.GetApiCall(
      ApiEndpoint.USER_NOTIFICATION_COUNT,
      headers
    );
    if (!!data) {
      if (data.status == true) {
        setUserCount(data.data);
      } else {
      }
    } else {
    }
    console.log(userCount, "pending");
  };

  stockInterval = setInterval(() => {
    getCountuser()
  }, 3000);

  React.useLayoutEffect(() => {
    return () => {
      if (!!stockInterval) {
        clearInterval(stockInterval)
      }
    }
  }, [])

  React.useEffect(() => {
    getCountuser();
  }, []);

  const onHandleclick = () => {
    router.push("./notification");
  };

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
            variant="h3"
            gutterBottom
            component="div"
            className={styles.hedingh3}
          >
            {props.data.title}
          </Typography>
          {props.data.desc && (
            <Typography sx={{ p: 1 }} className={styles.text}>
              {props.data.desc}{" "}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} className={styles.img2} md={6}>
     
          <Avatar variant="rounded" className={styles.pohotloho1}>
            <Avatar
              alt="Profile Picture"
              src={
                !!props.profile.profile_photo
                  ? props.profile.profile_photo
                  : "./image/image 3.png"
              }
              className={styles.pohotloho}
            />
          </Avatar>
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
export default connect(mapStateToProps, mapDispatchToProps)(Nevbar);
