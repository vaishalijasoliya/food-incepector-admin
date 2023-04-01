import style from '../styles/login.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField } from '@mui/material';
import { Container, height, width } from '@mui/system';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Logo from './logo';
import { useRouter } from 'next/router';



const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));



const Newpass = () => {

    const router = useRouter();
    const onLoginPress = () => {
        var body = {
            'newPassword': formik.values.newPassword,
            'reTypePassword': formik.values.reTypePassword
        }
        var headers = {
            "Content-Type": "application/json",
        }
        console.log(body)
        var data = (JSON.stringify(body), headers);


    }


    const formik = useFormik({
        initialValues: {
            newPassword: '',
            reTypePassword: '',
        },

        validationSchema: Yup.object({
            newPassword: Yup
                .string()
                .max(12)
                .min(8)
                .required(
                    'Password is required'),
            reTypePassword: Yup
                .string()
                .max(12)
                .min(8)
                .required(
                    'Repassword is required'),
        }),
        onSubmit: () => {
            onLoginPress()
            router.push('/')
            console.log()
        },


    });

    return (
        <>
            <Box >
                <Box width={'100%'} display={'flex'} justifyContent={'center'} margin="auto">
                    <Grid container spacing={0} className={style.container}>
                    <Grid item xs={12} md={6}>
                            <Item sx={{ background: 'transparent', boxShadow: 0 }}>
                                <div className={style.logodiiv1}>
                                    <img src='./image/loginlogo.png' className={style.logoimglatest}/>
                                    {/* <p className={style.logotxt}>Impression</p> */}
                                </div>
                            </Item>
                        </Grid>
                        
                        <Grid item xs={12} md={6} display={'flex'} className={style.hddhhdhdd}  justifyContent={'center'} alignItems={'center'}>
                            <Item className={style.list_padinglog} display="flex" justifyContent={'center'} sx={{ background: 'transparent', boxShadow: 0 }}>
                                <div className={style.cypass}>
                                    <Box>
                                        <Container sx={{ width: '100%', padding: '0px!important' }}>
                                            <p className={style.cypasstxt}>Creat new password</p>
                                            <p className={style.cypasssmltxt}>Your password must be different from previous used password.</p>

                                            <form onSubmit={formik.handleSubmit}>

                                                <TextField
                                                    name="newPassword"
                                                    lable='New Password'
                                                    placeholder='New Password'
                                                    className={style.passinput}
                                                    type='password'
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.newPassword}
                                                    error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
                                                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                                                    style={{
                                                        margin: "0px"
                                                    }}
                                                />

                                                <TextField
                                                    name="reTypePassword"
                                                    lable='Re-Type Password'
                                                    placeholder='Re-Type Password'
                                                    className={style.passinput}
                                                    type='password'
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.reTypePassword}
                                                    error={Boolean(formik.touched.reTypePassword && formik.errors.reTypePassword)}
                                                    helperText={formik.touched.reTypePassword && formik.errors.reTypePassword}
                                                />
                                                {/* <a href='./index'> */}
                                                <button type="submit" className={style.passbtn} > Set Password </button>
                                                {/* </a> */}
                                            </form>
                                        </Container>
                                    </Box>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}


export default Newpass
