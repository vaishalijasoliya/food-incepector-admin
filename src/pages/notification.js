import List from "../component/notification/notificationlist"
import { connect } from 'react-redux';
import { Types } from '/src/constants/actionTypes';
import Nevbar from '../component/user/newbarlist';
import Header from '../component/user/header';
import Paymenttable from '../component/user/paymenttable';
import styles from '../styles/user/index.module.css';
import Grid from '@mui/material/Grid';
// import { Types } from '../constants/actionTypes';
// import { connect } from 'react-redux';
const data = { title: "Notifications",
desc: "",
}

const Notification =(props) => {
    console.log(props,'notify')
    return(
        <>


    
      <Grid container spacing={0} className='mainDiv'>
        <Grid xs={12} sm={4} md={3} className='Gridcontainergrid' >

          <Nevbar />
        </Grid>
        <Grid xs={12} sm={8} md={9} className='maenedit'>
          <Header data={data} props={props} />
          <List props={props}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Notification);