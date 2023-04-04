import App from "../component/otp";
import Verify from "../component/verifyno";
import style from "../styles/login.module.css";
import { connect } from "react-redux";
import { Types } from "/src/constants/actionTypes";
import Login_layout from "../Layout/Pages_layout/loginLayout";

const Numverify = (props) => {
  return (
    <Login_layout Content={() => <Verify props={props} />} />
   
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Numverify);
