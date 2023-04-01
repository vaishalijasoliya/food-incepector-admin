import Mobile from "../component/monumber";
// import App from "../component/phone";
import style from '../styles/login.module.css'
import { connect } from 'react-redux';
import { Types } from '/src/constants/actionTypes';

const Phone = (props) => {


    return (

        <>
            <div className={style.main}>
                {/* <div className={style.imgloglistkk}>
                    <img src='./image/Group 1000002674.png' className={style.uplineimg} />
                </div> */}
                <div className={style.layout}>
                    <Mobile props = {props} />
                </div>
                {/* <div className={style.imgloglistkk2}>
                    <img src='./image/Group 1000002673.png' className={style.btmline} />
                </div> */}
            </div>
            {/* <div className={style.main}> */}
            {/* <img src='./image/upline.svg' className={style.uplineimg} /> */}
            {/* <div className={style.layout}>
                    <Mobile />
                </div> */}
            {/* <img src='./image/btmline.svg' className={style.btmline} /> */}
            {/* </div> */}
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




export default connect(mapStateToProps, mapDispatchToProps)(Phone);
