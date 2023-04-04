import Login_layout from "../Layout/Pages_layout/loginLayout";
import Newpass from "../component/updatepass";
import style from "../styles/login.module.css";

const Password = () => {
  return <Login_layout Content={() => <Newpass />} />;
};

export default Password;
