import style from "../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import ApiServices from "../config/ApiServices";
import ApiEndpoint from "../config/ApiEndpoint";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";
import { Box } from "@mui/material";
import { Input_error } from "../Layout/textString";

const Otpbox = (props) => {
  const router = useRouter();
  const [isoutField, setIsOutField] = useState(false);
  const [outField, setOutField] = useState("");
  const [otp, setOtp] = useState("");
  const verifyCode = async () => {
    console.log("Verification is in process");

    router.push('/createPassword')

    // var headers = {
    //   "Content-Type": "application/json",
    // };
    // var body = {
    //   id: props.id,
    //   code: outField,
    // };
    // props.props.loaderRef(true);
    // var data = await ApiServices.PostApiCall(
    //   ApiEndpoint.ADMIN_VERIFY_CODE,
    //   JSON.stringify(body),
    //   headers
    // );
    // props.props.loaderRef(false);
    // if (!!data) {
    //   if (data.status == true) {
    //     router.push("./creatpass");
    //   } else {
    //     toast.error(data.message);
    //   }
    // } else {
    //   toast.error("Something went wrong.");
    // }
  };
  return (
    <>
      <div className={style.otpinput}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          inputStyle={style.otp_input_style}
          numInputs={4}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      {isoutField == true && otp.length < 4 ? (
        <Input_error text={"Please enter Verification code"} />
      ) : null}
      <div className={style.Otpboxlistmenu}>
        <a
          className={style.averify}
          onClick={() => {
            router.push("");
          }}
        >
          {" "}
          Resend OTP{" "}
        </a>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsOutField(true);

          if (isoutField && otp.length == 4) {
            verifyCode();
          }
        }}
        className={style.verifybtn}
      >
        {" "}
        Verify{" "}
      </button>
    </>
  );
};

export default Otpbox;
