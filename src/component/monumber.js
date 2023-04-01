import style from '../styles/login.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, TextField } from '@mui/material';
import { Container, height, width } from '@mui/system';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Logo from './logo';
import 'react-phone-input-2/lib/style.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Phone from './phone';
import { useRouter } from 'next/router';



const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center'
}));


const Mobile = (props) => {

    console.log(props,'propsPhonse');
    const router = useRouter();

    const onLoginPress = async () => {
        var body = {
            'phone': formik.values.phone,
            // 'password': formik.values.password
        }
        var headers = {
            "Content-Type": "application/json",
        }

        var data = (JSON.stringify(body), headers)

        console.log(data)

    }
    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: Yup.object({
            phone: Yup
                .number()
                .max(10)
                .min(10)
                .required(
                    'Enter your 10 digit Number'),
        }),
        onSubmit: () => {
            onLoginPress()
        },
    })


    return (

        <>
            {/* <Box> */}
{/* 
                <Box width={'100%'} display={'flex'} justifyContent={'center'} margin="auto"> */}
                    <Grid container spacing={0} className={style.container} >
                        <Grid item xs={12} md={6}>
                            <Item sx={{ background: 'transparent', boxShadow: 0 }}>
                                <div className={style.logodiiv1}>
                                    <img src='./image/loginlogo.png' className={style.logoimglatest}/>
                                    {/* <p className={style.logotxt}>Impression</p> */}
                                </div>
                            </Item>
                        </Grid>
                        

                        <Grid item xs={12} md={6} className={style.hddhhdhdd} display={'flex'} justifyContent={'center'} alignItems={'center'} >
                            <Item className={style.Booleanlistmego2} display="flex" justifyContent={'center'} sx={{ background: 'transparent', boxShadow: 0 }}>

                                <div className={style.singin2}>
                                    <Box>
                                        <Container sx={{ width: '100%', padding: '0px!important', }}>
                                            <p className={style.cypasstxt}>Continue with phone</p>
                                            <p className={style.cypasssmltxt}>You’ll receive 4 digit code to verify next.</p>
                                            <Phone  props = {props.props}/>
                                        </Container>
                                    </Box>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                {/* </Box>
            </Box> */}

        </>
    )
}

export default Mobile


