import style from '../styles/login.module.css'
import { useState } from "react";
import ReactCodeInput from "react-code-input";
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import { toast } from 'react-toastify';

const Otpbox = (props) => {
    console.log(props,'propsaaaa');
    const router = useRouter();
    const [isoutField, setIsOutField] = useState(false);
    const [outField, setOutField] = useState('')

    const onLoginPress = async () => {
        if (outField.length == 0) {
            setIsOutField(true)
        } else {
            verifyCode()
        }
    }

    const verifyCode = async () => {
        var headers = {
            "Content-Type": "application/json",
        }
        var body = {
            id: props.id,
            code: outField
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_VERIFY_CODE, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        if (!!data) {
            if (data.status == true) {
                router.push("./creatpass")
            } else {
                // setErrorShow(true)
                toast.error(data.message)
            }
        } else {
            toast.error('Something went wrong.')
        }
    }

    const handlePinChange = outField => {
        setOutField(outField);
    };


    return (
        <>
            <div className={style.otpinput}>
                <ReactCodeInput
                    type='text'
                    fields={4}
                    name="otpfield"
                    onChange={handlePinChange}
                    value={outField}
                />
            </div>
            {isoutField == true ? <label className={style.otperr}>Please Enter Otp</label> : ""}
            <div className={style.Otpboxlistmenu}>
                <a className={style.averify} onClick={() => { router.push('') }}> Resend OTP  </a>
            </div>
            <button type='button' onClick={onLoginPress} className={style.verifybtn} >   Verify  </button>

        </>
    )
}

export default Otpbox

