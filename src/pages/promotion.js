import Nevbar from '../component/user/newbarlist';
import Header from '../component/user/header';
import Grid from '@mui/material/Grid';
import Promotionlist from '../component/Questions/Questions';
import styles from '../styles/promotion/promotionlist.module.css';
import { connect } from 'react-redux';
import { Types } from '/src/constants/actionTypes';

const index = (props) => {
  console.log(props, "virang");
  const data = {
    title: "Questions",
    // desc: "Morning James, Welcome to Clever Gifts Dashboard ",
  }
  return (
    <>
      <Grid container spacing={0} className='mainDiv'>
        <Grid xs={12} sm={4} md={3} className='gridcontainerdiv'  >
          <Nevbar />
        </Grid>
        <Grid xs={12} sm={8} md={9} className='maenedit' >
          <Header data={data} props={props} />
          <Promotionlist props={props} />
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




export default connect(mapStateToProps, mapDispatchToProps)(index);
