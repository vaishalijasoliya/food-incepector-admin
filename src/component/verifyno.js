import style from '../styles/login.module.css'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// import Otpbox from './otp';
import Logo from './logo';
import App from './otp';
import { useRouter } from 'next/router';
import { Types } from '../constants/actionTypes';
import { connect } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const Verify = (props) => {
    console.log(props, "codeprops")
    const router = useRouter();
    const [mobileNo, setMobileNo] = useState(0);
    const [idUser, setIdUser] = useState(0);


    useEffect(() => {
        if (!!router.query && !!router.query.mobile) {
            setMobileNo(router.query.mobile)
            setIdUser(router.query.id)
        }
    }, [router.isReady])


    return (
        !!mobileNo ?
            <Box width={'100%'} display={'flex'} justifyContent={'center'} margin="auto">

                <Grid container className={style.container}>
                <Grid item xs={12} md={6}>
                            <Item sx={{ background: 'transparent', boxShadow: 0 }}>
                                <div className={style.logodiiv1}>
                                    <img src='./image/loginlogo.png' className={style.logoimglatest}/>
                                    {/* <p className={style.logotxt}>Impression</p> */}
                                </div>
                            </Item>
                        </Grid>
            {/* <Grid item xs={0} md={6} display="flex" alignItems={'end'} justifyContent={'center'}>
            </Grid>
            <Grid item xs={12} md={6} display="flex" alignItems={'end'} justifyContent={'center'}>
                <Item className={style.Booleanlistmego} sx={{ background: 'transparent', boxShadow: 0 }}>
                    <div className={style.userspic33}>
                        <img src='./image/people2.svg' />
                    </div>
                </Item>
            </Grid> */}
                    <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Item className={style.Booleanlistmego} display="flex" justifyContent={'center'} sx={{ background: 'transparent', boxShadow: 0 }}>

                            <div className={style.singin3}>
                                <p className={style.verifytxt}>Verify Your Phone</p>
                                <p className={style.verifysmltxt}> Verification code sent to your phone
                                </p>
                                <p className={style.verifysmltxt}
                                    style={{
                                        paddingTop: "0px"
                                    }}> +{mobileNo.slice(0, mobileNo.length - 10)} {mobileNo.slice(mobileNo.length - 10, mobileNo.length - 7)} {mobileNo.slice(mobileNo.length - 7, mobileNo.length - 4)} {mobileNo.slice(mobileNo.length - 4, mobileNo.length)}</p>
                                <form>
                                    <App props={props.props} id={idUser} />
                                    {/* <p className={style.averify} onClick={() => {router.push('')}}> Resend OTP  </p>
                                        <button type='button' className={style.verifybtn} onClick={() => { router.push('./creatpass') }}>   Verify  </button> */}
                                </form>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </Box>

            : ""


    );
}


export default Verify