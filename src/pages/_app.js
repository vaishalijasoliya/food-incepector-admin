import Head from "next/head";
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import configureStore from '/src/store/configureStore';
import '../styles/globals.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import "rsuite/dist/rsuite.min.css";
import { connect } from 'react-redux';
import { Types } from '/src/constants/actionTypes';
import { useRouter } from 'next/router';

// import '@coreui/coreui/dist/css/coreui.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore()
const MyApp = (props) => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [isProgress, setIsProgress] = useState(false)
  const { Component , pageProps } = props;
  const router = useRouter();

  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })
  console.log(props,'props')

  useEffect(() => {
    var persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
    if (!!persistedState && !!persistedState.user && !!persistedState.user.profile.token) {
      if(router.pathname == '/'){
        props.router.push(router.push('./dashboard'));
      }
      setIsLoaded(true)
    } else {
      props.router.push('/');
      setTimeout(() => {
        setIsLoaded(true)
      }, 300);
    }
  }, [])

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Food Incepector</title>
          <meta name="description" content="Food Incepector" />
          <link rel="icon" href="./image/impress logo.png"/>
        </Head>

        {isProgress && <Box sx={{ display: 'flex', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
              <CircularProgress color={'primary'} />
            </Box>}
        {isLoaded ? <Component loaderRef={setIsProgress} {...pageProps} /> : null}

        <ToastContainer />
      </Provider>
    </>
  );
}

export default MyApp;

