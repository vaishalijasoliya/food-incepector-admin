import React, { useState } from "react";
import style from "../styles/login.module.css";
import { useRouter } from "next/router";
import ApiServices from "../config/ApiServices";
import ApiEndpoint from "../config/ApiEndpoint";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { Error_msg } from "./Utils/message";
import { convertToIndianMobileNumberFormat } from "./Utils/func";

const Phone = (props) => {
  const router = useRouter();
  const [isoutField, setIsOutField] = useState(false);
  const [moNumber, setOutField] = useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");

  // const sendOtpMobile = async () => {
  //   var headers = {
  //     "Content-Type": "application/json",
  //   };
  //   var body = {
  //     phone_number:
  //       "+" +
  //       moNumber.slice(0, moNumber.length - 10) +
  //       " " +
  //       moNumber.slice(moNumber.length - 10, moNumber.length),
  //   };
  //   props.props.loaderRef(true);
  //   var data = await ApiServices.PostApiCall(
  //     ApiEndpoint.ADMIN_FORGOT_PASSWORD,
  //     JSON.stringify(body),
  //     headers
  //   );
  //   props.props.loaderRef(false);
  //   if (!!data) {
  //     if (data.status == true) {
  //       router.push({
  //         pathname: "./codevrfy",
  //         query: { mobile: moNumber, id: data.data.id },
  //       });
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } else {
  //     toast.error("Something went wrong.");
  //   }
  // };

  const sendOtpMobile = async () => {
    setIsOutField(true);

    if (mobileNumber && mobileNumber.length == 10) {
      var headers = {
        "Content-Type": "application/json",
      };
      var body = {
        phone_no: convertToIndianMobileNumberFormat(mobileNumber),
      };
      var data = await ApiServices.PostApiCall(
        // ApiEndpoint.FORGET_PASSWORD,
        JSON.stringify(body),
        headers
      );
      router.push({
        query: {
          mobile: convertToIndianMobileNumberFormat(mobileNumber),
          id: 2,
        },
        pathname: "/verification",
      });

      if (data) {
        if (data.status == true) {
          router.push({
            query: {
              mobile: convertToIndianMobileNumberFormat(mobileNumber),
              id: data.data.id,
            },
            pathname: "/verification",
          });
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error(Error_msg.NOT_RES);
      }

      // router.push({
      //   query: { mobile: mobileNumber },
      //   pathname: "/verification",
      // });
    }
  };

  return (
    <>
      <div className={style.phonediv}>
        <TextField
          className={style.Input_field}
          onChange={(event) => {
            setMobileNumber(event.target.value);
          }}
        />
      </div>
      {/*  */}
      {isoutField == true &&
      (mobileNumber == "" || mobileNumber.length != 10) ? (
        <span className={style.otperr}>Enter Valid Mobile-Number</span>
      ) : (
        ""
      )}
      <button type="button" className={style.submitbtn} onClick={sendOtpMobile}>
        {" "}
        Continue with phone{" "}
      </button>
    </>
  );
};

export default Phone;
