import style from "../styles/login.module.css";

const Logo = () => {
  return (
    <>
      <div className={style.logo}>
        <img src="./image/logo 2.svg" className={style.logopic} />
        <p className={style.logotxt}>Impression</p>
      </div>
    </>
  );
};

export default Logo;
