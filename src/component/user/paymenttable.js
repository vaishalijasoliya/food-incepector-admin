import * as React from "react";
import styles from "../../styles/user/paymenttable.module.css";
import Appusers from "./appusers";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import moment from "moment";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export default function DataGridDemo(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userStatus, setUserStatus] = React.useState("Sign up");
  const [signupCount, setSignupCount] = React.useState(0);
  const [activeCount, setActiveCount] = React.useState(0);
  const [inactiveCount, setInactiveCount] = React.useState(0);
  const [signupList, setSignupList] = React.useState([]);
  const [onlineList, setOnlineList] = React.useState([]);
  const [inactiveList, setInactiveList] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [activeUser, setActiveuser] = React.useState("signup");
  const [signUpCsvlist, setSignUpCsvlist] = React.useState([]);
  const [activeCsvlist, setActiveCsvlist] = React.useState([]);
  const [inActiveCsvlist, setInActiveCsvlist] = React.useState([]);
  const [csvlist, setCsvlist] = React.useState([]);

  // function Choice() {
  //     var box = document.getElementById("box");
  //     if (signupCount.clicked == true) {
  //         box.style.backgroundColor = "red";
  //         console.log("virang");
  //     } else {
  //         console.log("virang11");
  //     }
  // }

  const usercountlist = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);
    const data = await ApiServices.GetApiCall(
      ApiEndpoint.USER_COUNT_LIST,
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        setActiveCount(kFormatter(data.activeUser));
        setInactiveCount(kFormatter(data.inactiveUser));
        setSignupCount(kFormatter(data.signUpUser));
      }
    }
  };
  function kFormatter(number) {
    const num = parseInt(number);
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  console.log(userStatus, "serStatus");

  const userListfilter = (startdate, enddate) => {
    console.log(startdate, enddate, "after select file");
    setStartDate(startdate);
    setEndDate(enddate);
    console.log(startDate, endDate, "after");
    if (userStatus == "Active") {
      console.log("red");
      getOnlineiUserList();
    } else if (userStatus == "Inactive") {
      console.log("mego");
      getInActiveUserList();
    } else {
      console.log("com");
      getSingUpUserList();
    }
  };

  const userStatusChange = (event) => {
    setUserStatus(event);
    console.log(event, "propsststs");
    setTableData(signupList);
    setCsvlist(signUpCsvlist);
    if (event == "Sign up") {
      setTableData(signupList);
      setActiveuser("signup");
      setCsvlist(signUpCsvlist);
    }
    if (event == "Active") {
      setTableData(onlineList);
      setActiveuser("online");
      setCsvlist(activeCsvlist);
    }
    if (event == "Inactive") {
      setTableData(inactiveList);
      setActiveuser("Inactive");
      setCsvlist(inActiveCsvlist);
    } else {
      ("");
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getSingUpUserList = async (startDate, endDate) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = { type: "active" };
    if (!!startDate && !!endDate) {
      body.start_day = moment(startDate).format("MM/DD/YYYY");
      body.end_day = moment(endDate).format("MM/DD/YYYY");
    }
    console.log(body, "body");
    props.props.loaderRef(true);
    const data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        const activeData = [];
        const csvall = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          const object = {
            id: element.id,
            All: element.user_type,
            Email: element.email,
            Gender: element.gender,
            Name: element.full_name,
            Phone: element.phone_number,
            User: element.profile_photo,
            status: element.status,
          };
          const objectcsv = {
            id: element.id,
            All: element.user_type,
            Email: element.email,
            Gender: element.gender,
            Name: element.full_name,
            Phone: element.phone_number,
            status: element.status,
            // User: element.profile_photo,
          };

          activeData.push(object);
          csvall.push(objectcsv);
        }
        setSignupList(activeData);
        console.log("activeData", activeData);
        setTableData(activeData);
        setSignUpCsvlist(csvall);
        setCsvlist(csvall);
        // setActiveuser('signup')
      } else {
        setSignupList([]);
        setTableData([]);
        setSignUpCsvlist([]);
        setCsvlist([]);
      }
    }
  };

  const getOnlineiUserList = async (startDate, endDate) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = { type: "online" };
    if (!!startDate && !!endDate) {
      body.start_day = moment(startDate).format("MM/DD/YYYY");
      body.end_day = moment(endDate).format("MM/DD/YYYY");
    }
    props.props.loaderRef(true);
    const data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        const onlineData = [];
        const csvonline = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          const object = {
            id: element.id,
            All: element.user_type,
            Email: element.email,
            Gender: element.gender,
            Name: element.full_name,
            Phone: element.phone_number,
            User: element.profile_photo,
          };
          const objectcsv = {
            id: element.id,
            All: element.user_type,
            Email: element.email,
            Gender: element.gender,
            Name: element.full_name,
            Phone: element.phone_number,
            // User: element.profile_photo,
          };
          onlineData.push(object);
          csvonline.push(objectcsv);
        }
        setOnlineList(onlineData);
        // setActiveuser('online')
        setActiveCsvlist(csvonline);
        console.log(onlineList, "onlinelist");
      } else {
        setOnlineList([]);
        setActiveCsvlist([]);
      }
    }
  };
  const getInActiveUserList = async (startDate, endDate) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = { type: "inactive" };
    if (!!startDate && !!endDate) {
      body.start_day = moment(startDate).format("MM/DD/YYYY");
      body.end_day = moment(endDate).format("MM/DD/YYYY");
    }
    props.props.loaderRef(true);
    const data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        console.log(data.data, "dataa");
        const inactiveData = [];
        const csvinactive = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          const object = {
            id: element.id,
            All: element.user_type,
            Email: element.email,
            Gender: element.gender,
            Name: element.full_name,
            Phone: element.phone_number,
            User: element.profile_photo,
            status: element.status,
          };
          const objectcsv = {
            id: element.id,
            All: element.user_type,
            Email: element.email,
            Gender: element.gender,
            Name: element.full_name,
            Phone: element.phone_number,
            status: element.status,
            // User: element.profile_photo,
          };
          inactiveData.push(object);
          csvinactive.push(objectcsv);
        }
        setInactiveList(inactiveData);
        setInActiveCsvlist(csvinactive);
        // setActiveuser('inactive')
      } else {
        setInactiveList([]);
        setInActiveCsvlist([]);
      }
    }
  };

  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      usercountlist();
      getSingUpUserList();
      getOnlineiUserList();
      getInActiveUserList();
    }
  }, []);

  console.log(activeUser == "Inactive", "active");
  console.log(tableData, "tableData");
  return (
    <>
      <Grid className={styles.tebalrow} item xs={12} md={12}>
        <Box className={styles.boxtebalmc}>
          <Appusers
            status={userStatus}
            filterList={userListfilter}
            getSingUpUserList={getSingUpUserList}
            getOnlineiUserList={getOnlineiUserList}
            getInActiveUserList={getInActiveUserList}
            csvlist={csvlist}
            props={props.props}
            userList={tableData}
          />
        </Box>
      </Grid>
    </>
  );
}
