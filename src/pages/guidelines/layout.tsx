import style from './Guidelines.module.scss'

import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';
const Dashboard = (props) => {
    console.log(props.content)
    return (
        <>

            <div className={style.Dashboardcontent}>
                {props.content}
            </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
//export default