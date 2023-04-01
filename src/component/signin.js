import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import style from '../styles/login.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Typography } from '@mui/material';
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import { toast } from 'react-toastify';
import { Types } from '../constants/actionTypes';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Logo from './logo';


const Item = styled(Paper)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    textAlign: 'center',
}));

const Signin = (props) => {
    console.log(props, 'signinprops')
    const router = useRouter();

    const onLoginPress = async () => {
        var body = {
            'user_name': formik.values.username,
            'password': formik.values.password
        }
        var headers = {
            "Content-Type": "application/json",
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.LOGIN_USER, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data)
        if (!!data) {
            if (data.status == true) {
                data.data.token = data.token
                props.save_user_data({ user: data.data });
                toast.success("Logged In Succesfully")
                router.push('./dashboard')
            } else {
                // setErrorShow(true)
                toast.error(data.message)
            }
        } else {
            toast.error('Something went wrong.')
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(255)
                .required(
                    'Username is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required'),
        }),
        onSubmit: () => {
            onLoginPress()
        },
    });

    return (
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
            </Grid> */}
            {/* <Grid item xs={12} md={6} display="flex" alignItems={'end'} justifyContent={'center'}>
                <Item className={style.Booleanlistmego} sx={{ background: 'transparent', boxShadow: 0 }}>
                    <div className={style.userspic}>
                        <img src='./image/people2.svg' />
                    </div>
                </Item>
            </Grid> */}
            <Grid item xs={12} md={6} display={'flex'} justifyContent={'right'} alignItems={'center'}>
                <Item className={style.Booleanlistmego} display="flex" justifyContent={'center'} sx={{ background: 'transparent', boxShadow: 0 }}>

                    <div className={style.singin}>
                        <Box>
                            <p className={style.signintxt}>Sign in</p>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    error={Boolean(formik.touched.username && formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                    name="username"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    lable='Username'
                                    placeholder='Username'
                                    className={style.userinput}
                                    type='text'
                                    style={{
                                        margin: '0px'
                                    }}
                                />

                                <TextField
                                    error={Boolean(formik.touched.password && formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    lable='Password'
                                    placeholder='Password'
                                    className={style.userinput}
                                    type='password'
                                />
                                <button
                                    type='button'
                                    onClick={() => { router.push('./phoneno') }}
                                    className={style.frgttxt}
                                > Forgot password? </button>

                                <button type="submit" className={style.singbtn}> Sign in </button>
                            </form>
                        </Box>
                    </div>
                </Item>
            </Grid>
        </Grid>
        // {/* </Box> */ }
        // </Box>
    );
}
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);