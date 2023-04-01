import { Grid } from "@mui/material"
import Nevbar from '../component/user/newbarlist';
import Mainscr from "../component/2nddash/nextdashmain"
import Header from '../component/user/header';
import styles from '../styles/user/index.module.css';
import { connect } from 'react-redux';

const Dashdata = (props) => {
    console.log(props, "Home")
    const data = {
        title: "Review",
        desc: "Morning James, Welcome to Clever Gifts Dashboard ",
    }

    return (
        <>
            <Grid container spacing={1} className='mainDiv'>
                <Grid xs={12} sm={4} md={3} className={styles.newbar1}>
                    <Nevbar />
                </Grid>
                <Grid xs={12} sm={8} md={9} className='maenedit'>
                    <Header data={data} props={props} />
                    <Mainscr props={props} />
                </Grid>
            </Grid>
        </>



    )
}


const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashdata);