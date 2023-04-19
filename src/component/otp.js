import style from "../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import OTPInput from "react-otp-input";
import { Input_error } from "../Layout/textString";
import ApiServices from "../config/ApiServices";
import ApiEndpoint from "../config/ApiEndpoint";
import { convertToIndianMobileNumberFormat } from "./Utils/func";
import { toast } from "react-toastify";

const Otpbox = (props) => {
  const router = useRouter();
  const [isoutField, setIsOutField] = useState(false);
  const [otp, setOtp] = useState("");

  const verifyCode = async () => {
    // router.push("/createPassword");

    var headers = {
      "Content-Type": "application/json",
    };
    var body = {
      id: router.query.id,
      code: otp,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.VERIFY_OTP,
      JSON.stringify(body),
      headers
    );

    props.props.loaderRef(false);

    router.push("/createPassword");

    if (!!data) {
      if (data.status == true) {
        // router.push("./creatpass");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };

  const onResend = async () => {
    var headers = {
      "Content-Type": "application/json",
    };
    var body = {
      phone_no: router.query.mobile,
    };
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.FORGET_PASSWORD,
      JSON.stringify(body),
      headers
    );
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
        <button
          type="button"
          className={style.averify}
          style={{ background: "transparent", border: "0px" }}
          onClick={() => {
            onResend();
            // router.push("");
          }}
        >
          {" "}
          Resend OTP{" "}
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsOutField(true);

          if (isoutField && otp.length == 4) {
            verifyCode();
          }
        }}
        className={style.submitbtn}
      >
        {" "}
        Verify{" "}
      </button>
    </>
  );
};

export default Otpbox;
