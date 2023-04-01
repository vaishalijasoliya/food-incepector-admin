import style from '../styles/login.module.css'
import Signin from '../component/signin.js'

const main = (props) => {
  console.log(props)
  return (
    <>

      <div className={style.main}>
        <div className={style.layout}>
            <Signin props={props} />
          </div>


        {/* <div className={style.imgloglistkk}>
          <img src='./image/Group 1000002674.png' className={style.uplineimg} />
        </div>
        <div className={style.layout}>
          <Signin props={props} />
        </div>
        <div className={style.imgloglistkk2}>
          <img src='./image/Group 1000002673.png' className={style.btmline} />
        </div> */}
      </div>


    </>
  )
}

export default main