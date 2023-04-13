import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import style from "../../styles/dashboard.module.css";
import { useState } from "react";

export default function MediaControlCard(props) {
  const [selectOptions, setselectOptions] = React.useState([]);
  const [region, setRegion] = useState([]);
  const [regionlist, setRegionlist] = useState([]);

  // const reviewViewuser = async () => {
  //   var headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": props.props.props.profile.token,
  //   };
  //   var body = {
  //     // 'status': 'pending'
  //   };
  //   props.props.props.loaderRef(true);
  //   var data = await ApiServices.PostApiCall(
  //     ApiEndpoint.ADMIN_PAYMENT,
  //     JSON.stringify(body),
  //     headers
  //   );
  //   props.props.props.loaderRef(false);
  //   if (!!data) {
  //     if (data.status == true) {
  //       console.log(data.data[0] + " " + data[0], "element");
  //       // console.log(data.status, 'ssstatuss')
  //       const arr = [];
  //       const listfastdata = [];
  //       const selectArray = [];
  //       for (let index = 0; index < data.data.length; index++) {
  //         const element = data.data[index];

  //         const obj = {
  //           number: element.number + element.type,
  //           payment: element.payment,
  //           // type: element.type,
  //         };

  //         const objSelect = {
  //           name: element.number + " " + element.type,
  //           plus: element.payment,
  //           // type: element.type,
  //         };
  //         arr.push(obj);
  //         selectArray.push(objSelect);
  //         listfastdata.push(data.data[0].number + " " + data.data[0].type);
  //       }
  //       setRows(arr);
  //       setRegion(listfastdata);
  //       console.log(selectArray, "selectArray");
  //       setselectOptions(selectArray);
  //     }
  //   }
  //   setRegion(data.data[0].number + " " + data.data[0].type);
  //   setRegionlist(data.data[0].payment);
  // };

  React.useEffect(() => {
    if (!!props.props.props.profile && !!props.props.props.profile.token) {
      // reviewViewuser();
    }
  }, []);
  const [value, setValue] = useState("");

  const getPaymentValue = (value) => {
    var test = selectOptions.find((o) => o.name == value);
    if (!!test) {
      return test.plus;
    }
    return regionlist;
  };
  return (
    <Card className={style.cardcompo}>
      <Box className={style.cardmain}>
        <CardContent sx={{ padding: "0px", margin: "0px" }}>
          <p className={style.datetxt} id="demo">
            {value == "" ? region : value}
          </p>
          <p className={style.moneytxt}>Money Make Last</p>
          <p className={style.amttxt}>{getPaymentValue(value)} </p>

          <Box sx={{ minWidth: 120 }}>
            <form>
              <select
                className={style.selector}
                value={value}
                onChange={(item) => {
                  console.log(item.target.value, "selectitem", item),
                    setValue(item);
                  setValue("012");
                  setValue(item.target.value);
                }}
              >
                {selectOptions.map((item, index) => (
                  <option className={style.opt} key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </form>
          </Box>
        </CardContent>

        <CardContent style={{ padding: "0px" }}>
          <img src="./image/offercard.svg" className={style.walletimg} />
        </CardContent>
      </Box>
    </Card>
  );
}
