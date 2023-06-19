import styles from "../../styles/user/hedar.module.css";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { Button, ListItemIcon, Menu } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeData } from "../Utils/func";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Types } from "../../../src/constants/actionTypes";
const Nevbar = (props) => {
  const router = useRouter();
  // let navigate = useNavigate();

  const [userCount, setUserCount] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [age, setAge] = React.useState('en_US');
  var currentPath = router.pathname;
  const [listlegveg, setLegvg] = React.useState('')
  
  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  console.log(props, 'propspropsprops');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    router.push("/");
    handleClose();
  };
  console.log(age, 'ageageage');
  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={styles.maencontainer}
      >
        <Grid className={styles.textheging} item xs={12} md={6}>
          <Typography gutterBottom component="div" className={styles.hedingh3}>
            {props.data.title}
          </Typography>
        </Grid>
        <Grid item xs={12} className={styles.img2} md={6}>
          {listlegveg == 'pl_PL' ?
            <Button style={{marginRight:'10px'}}  className={styles.adfjadjjadjdd} onClick={() => {
              localStorage.setItem('language', 'en_US')
              window.location.href = currentPath
            }}>
              English
              
            </Button> : <Button className={styles.jsahfsahfhf} disabled>
            English
            </Button>}
          {listlegveg == 'en_US' ?
            <Button style={{marginLeft:'10px'}} className={styles.adfjadjjadjdd}  onClick={() => {
              localStorage.setItem('language', 'pl_PL')
              window.location.href = currentPath
            }}>
              Arabic
            </Button>
            : <Button className={styles.jsahfsahfhf}  disabled>
            Arabic
            </Button>}
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel> */}

          {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              // key={age}
              // defaultValue={'pl_}
              value={age}
              onChange={handleChange}
              className={styles.selece_data_menu_item}
            >
             <MenuItem value={'en_US'}>en_US</MenuItem>
              <MenuItem value={'pl_PL'}>pl_PL</MenuItem>
            </Select>  */}
          {/* </FormControl> */}
          <button className={styles.pohotloho1} onClick={handleClick}>
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
                removeData({ logout: logOut });
              }}
            >
              <LogoutIcon color="action" />
              {listlegveg=='pl_PL'?' تسجيل خروج':'Logout'}
              
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
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nevbar);
