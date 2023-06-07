import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import configureStore from "/src/store/configureStore";
import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress, Box, StyledEngineProvider } from "@mui/material";
import { connect } from "react-redux";
import { Types } from "/src/constants/actionTypes";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";

// import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();
const MyApp = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const { Component, pageProps } = props;
  const router = useRouter();

  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });
  console.log(props, "props");

  useEffect(() => {
    var persistedState = localStorage.getItem("reduxState")
      ? JSON.parse(localStorage.getItem("reduxState"))
      : {};

    if (
      !!persistedState &&
      !!persistedState.user &&
      !!persistedState.user.profile.token
    ) {
      // router.push("./dashboard");
      setIsLoaded(true);
    } else {
      // router.push("/");
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Food Incepector</title>
          <meta name="description" content="Food Incepector" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        {isProgress && (
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <CircularProgress color={"primary"} />
          </Box>
        )}
        <StyledEngineProvider injectFirst>
        {isLoaded ? (
          <Component loaderRef={setIsProgress} {...pageProps} />
        ) : null}

        <ToastContainer />
        </StyledEngineProvider>
      </Provider>
    </>
  );
};

export default MyApp;
