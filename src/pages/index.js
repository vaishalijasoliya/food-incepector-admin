import style from "../styles/login.module.css";
import Signin from "../component/signin.js";
import Login_layout from "../Layout/Pages_layout/loginLayout";

const main = (props) => {
  console.log(props);
  return (
    <>
      <Login_layout Content={() => <Signin props={props} />} />
    </>
  );
};

export default main;
