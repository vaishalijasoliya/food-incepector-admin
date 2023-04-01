import styles from '../../styles/user/newbar.module.css';
import GridViewIcon from '@mui/icons-material/GridView';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FlakyIcon from '@mui/icons-material/Flaky';
import RadioIcon from '@mui/icons-material/Radio';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ButtonGroup from '@mui/material/ButtonGroup';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Box from '@mui/material/Box';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { Types } from '../../../src/constants/actionTypes';
import { toast } from 'react-toastify';
// import { useRouter } from 'next/router';
import { useState } from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Link,
  Typography
} from "@material-ui/core";
import MailIcon from '@mui/icons-material/Mail';

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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [active, setActive] = useState('');
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [advertiseMent, setAdvertisement] = React.useState("")
  var handleClickOpenCom = (myprops) => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
    myprops = { advertiseMent }
  };
  var handleClickOpenCom = (myprops) => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
    myprops = { advertiseMent }
  };
  const handleCloseCom = () => {
    setCom(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  var currentPath = router.pathname

  const activeBtn = (event) => {
    setActive(event.target.id)

  }
  const buttons = [


    <Button className={currentPath == '/dashboard' ? styles.active : ''} id={styles.butgri} onClick={(() => {
      router.push('./dashboard'),
        setActive("dashboard")
    })}>
      <span>Dashboard</span>
    </Button>,
    <Button onClick={(() => { router.push('./user') })} id={styles.butgri} variant="outlined" className={currentPath == '/user' ? styles.active : ""}  ><span >Inceptor</span></Button>,
    <Button onClick={(() => { router.push('./payments') })} className={currentPath == '/payments' ? styles.active : ""} key="one" variant="outlined" id={styles.butgri} ><span >Catergory</span></Button>,
    <Button onClick={(() => { router.push('./promotion') })} className={currentPath == '/promotion' ? styles.active : ""} key="one" variant="outlined" id={styles.butgri} ><span >Questions</span></Button>,
    // <Button onClick={(() => { router.push('./support') })} className={currentPath == '/support' ? styles.active : ""} key="one" variant="outlined" id={styles.butgri} ><span className={styles.btndtl3}>Questionsdd</span></Button>,
   
    // <Button onClick={(() => { router.push('./guidelines') })} className={currentPath == '/guidelines' ? styles.active : ""} variant="outlined" id={styles.butgri} ><CameraFrontIcon className={styles.iconside} /><span className={styles.btndtl5}>Guidelines</span></Button>,
    // <Button onClick={(() => { router.push('./review') })} className={currentPath == '/review' ? styles.active : ""} variant="outlined" id={styles.butgri} ><StarOutlineIcon className={styles.iconside} /><span className={styles.btndtl6}>Reviews</span></Button>,
    <Button variant="outlined" type="button" id={styles.butgri} 
    onClick={handleClickOpenCom} >
      {/* <CameraFrontIcon className={styles.iconside} /> */}
      <span> Logout </span>
    </Button>
  ]; return (
    <>

      <Grid container className={styles.cantenar2} >
        <Grid item xs={12} className={styles.newbar} >

          <div style={{ margin: '0 auto' }} className={styles.logopedii}>
            <img alt="Remy Sharp" src="./image/admnlogo.png" className={styles.lianpohot} />
          </div>
          <Box className={styles.btnhoime}>
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical outlined button group"
              className={styles.newbtnrow}
            >
              {buttons}

            </ButtonGroup>
            <div >
              <Dialog open={com} onClose={handleCloseCom}
                className={styles.borderredayasfor}
                md={{
                  // borderRadius: '7px'
                }}
                // fullWidth
                maxWidth="md"
              >
                <div>
                  <DialogContent className={styles.popupcasdfntenar}>
                    <div className={styles.lgtextout}>
                      <Typography>
                        Logout
                      </Typography>
                    </div>
                    <div className={styles.areypulisfg}>
                      <Typography>
                        Are you sure you want to logout
                      </Typography>
                    </div>
                    <div className={styles.btn2yesno}>
                      <Button className={styles.yesbtnlisggs2} onClick={handleCloseCom}>
                        No
                      </Button>
                      <Button className={styles.yesbtnlisggs} onClick={() => {
                        var profile = ""
                        props.save_user_data({ user: "" })
                        router.push('/');
                        toast.success('Logout Successfully!')
                      }}>Yes</Button>
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
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(home);