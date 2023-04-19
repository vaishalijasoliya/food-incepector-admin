import Login_layout from "../Layout/Pages_layout/loginLayout";
import Newpass from "../component/updatepass";
import style from "../styles/login.module.css";

const Password = (props) => {
  return <Login_layout Content={() => <Newpass props={props} />} />;
};

export default Password;
