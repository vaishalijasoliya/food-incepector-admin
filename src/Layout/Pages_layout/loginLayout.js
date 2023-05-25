import { Grid, Paper } from "@mui/material";
import style from "../../styles/login.module.css";
// import styled from "@emotion/styled";
import { styled } from "@mui/material/styles";
import Image from "next/image";
// import logoimage from "/public/favicon.png";

const Login_layout = ({ Content }) => {
  const Item = styled(Paper)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(2),
    textAlign: "center",
  }));
  return (
    <>
      <div className={style.main}>
        <div className={style.layout}>
          <Grid container className={style.container}>
            <Grid item xs={12} md={6}>
              <Item
                sx={{ background: "transparent", boxShadow: 0 }}
                className={style.Main_logo_div}
              >
                <div className={style.logodiiv1}>
                  {/* <img
                    src="/favicon.png"
                    className={style.logoimglatest}
                  /> */}
                  <Image
                    src="/favicon.png"
                    width={250}
                    height={250}
                    alt="logo"
                  />
                </div>
              </Item>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"right"}
              alignItems={"center"}
            >
              <Item
                className={style.Booleanlistmego}
                display="flex"
                justifyContent={"center"}
                sx={{ background: "transparent", boxShadow: 0 }}
              >
                <Content />
              </Item>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Login_layout;
