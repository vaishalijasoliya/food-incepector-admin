import { useState } from 'react'
import style from '../styles/login.module.css'
import Box from '@mui/material/Box';
import { NoEncryption } from '@mui/icons-material';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import { toast } from 'react-toastify';

const Phone = (props) => {

    console.log(props, "Phoneprops")

    const router = useRouter();
    const [isoutField, setIsOutField] = useState(false);
    const [moNumber, setOutField] = useState('')

    const sendOtpMobile = async () => {
        var headers = {
            "Content-Type": "application/json",
        }
        var body = {
            'phone_number': '+' + moNumber.slice(0, moNumber.length - 10) + ' ' + moNumber.slice(moNumber.length - 10, moNumber.length),
        }
        props.props.loaderRef(true)
        console.log(ApiEndpoint.ADMIN_FORGOT_PASSWORD, body, headers, 'headers');
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_FORGOT_PASSWORD, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, 'datat');
        if (!!data) {
            if (data.status == true) {
                router.push({
                    pathname: './codevrfy',
                    query: { mobile: moNumber, id: data.data.id }
                });
            } else {
                // setErrorShow(true)
                toast.error(data.message)
            }
        } else {
            toast.error('Something went wrong.')
        }
    }

    const onLoginPress = () => {
        if (moNumber.length < 10) {
            setIsOutField(true)
        }
        else {
            sendOtpMobile()
        }
    }




    const handlePinChange = moNumber => {
        setOutField(moNumber);
    };

    return (
        <>

            <div className={style.phonediv}>
                <PhoneInput
                    inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true
                    }}
                    country={"us"}
                    placeholder="Enter phone number"
                    containerClass={style.mycountry}
                    inputClass={style.myinput}
                    dropdownClass={style.mydrop}
                    buttonClass={style.mybutton}
                    value={moNumber}
                    onChange={handlePinChange}
                />
            </div>
            {isoutField == true ? <span className={style.otperr}>Please Enter Valid Mobile-Number</span> : ""}
            <button type="button" className={style.numberbtn} onClick={onLoginPress}>  Continue with phone  </button>
        </>
    )
}

export default Phone