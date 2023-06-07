import * as React from "react";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import styles from "../../styles/user/paymenttable.module.css";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import {
  Avatar,
  Button,
  Dialog,
  IconButton,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { auditData } from "../Utils/data";
import { TableComponent } from "../Audit/tablecomponentaudit";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import moment from "moment";
import DatePickerll from "react-datepicker";

const Audit_page = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [customer, setCustomer] = React.useState([]);
  const [customerList, setCustomerList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [aciveData, setActiveData] = React.useState([]);
  const [deletedData, setDeleteddata] = React.useState([]);
  const [activeSearch, setActiveSearch] = React.useState([]);
  const [deletedSearch, setDeletedSearch] = React.useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [dataList, setDatalist] = React.useState([]);
  const [dataList_two, setDatalist_two] = React.useState([]);
  const [dataList_two_tree, setDatalist_two_tree] = React.useState([]);

  const [newrespons, setNewrespion] = React.useState([])
  const [age, setAge] = React.useState('');
  const [age_two, setAge_two] = React.useState('');
  const [arrlogg, setJSJHSJns] = React.useState([])
  const [userRender, setUserRender] = React.useState(true);
  const [hotelsData_, setHotelData] = React.useState([]);
  const [auditorRender, setAuditorRender] = React.useState(true);
  const [dataSearch, setDataSearch] = React.useState([]);
  const [dataList_tree, setDatalist_tree] = React.useState([]);
  const sm = moment().subtract(1, 'M').format("YYYY-MM-DD HH:mm:ss");
  const [startDate, setStartDate] = React.useState();
  const fm = moment(sm).add(1, 'M').format("YYYY-MM-DD HH:mm:ss");
  const [endDate, setEndDate] = React.useState();
  const today = new Date();

  console.log(activeSearch, 'activeSearchactiveSearch');
  console.log(dataList_tree, dataList_two, 'hotelsData_');
  console.log(dataList_two, age, 'dataList_two');
  const handleChange_select = (event) => {
    setAge(event.target.value);
  };
  const handleChange_select_two = (event) => {
    setAge_two(event.target.value);
  };
  // const tokenObj = {
  //   token: "is____token",
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };

  const handleCloseTWO = () => {
    setOpenTWO(false);
    formik.resetForm();
  };

  const handleClose_delete = () => {
    setDeleteOpen(false);
  };

  const handleOpen_delete = () => {
    setDeleteOpen(true);
  };
  const getAuditorList = async () => {
    console.log('is____called')
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {
      type: 'active',
    };
    props.props.loaderRef(true);
    console.log(props.props, "loaderrefauditor")

    var data = await ApiServices.PostApiCall(
      ApiEndpoint.AUDITOR_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {

        setDataSearch(data.data);
        setDatalist_tree(data.data);
      }
    }

    setAuditorRender(false);
  };
  const getAuditList = async () => {
    // console.log("headers");
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {};
    props.props.loaderRef(true);
    console.log(props.props, "loaderref")
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.AUDIT_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        console.log("api_res", data.data);
        setDatalist(data.data);
        setDatalist_two(data.data)
        setDatalist_two_tree(data.data)
        setActiveData(data.data)
        setNewrespion(data.data)
      }
    }
  };
  React.useEffect(() => {
    console.log(age, 'ageage');
    var pendingarr = [];
    for (let index = 0; index < dataList_two.length; index++) {
      const element = dataList_two[index];
      if (age == '') {
        pendingarr.push(JSON.parse(JSON.stringify(element)))
      }
      // else if (element.location_name == age && element.user.id == age_two) {
      //   console.log('adddd1');
      //   pendingarr.push(JSON.parse(JSON.stringify(element)))
      // }
      else if (element.location_name == age) {
        console.log('adddd2');
        pendingarr.push(JSON.parse(JSON.stringify(element)))
      }
      console.log(element, 'elementelementelement');
    }

    setJSJHSJns(pendingarr)
    // setDatalist_two(pendingarr)
    console.log(pendingarr, 'pendingarr');

  }, [age, dataList]);

  React.useEffect(() => {
    console.log(age, 'ageage');
    var pendingarr = [];
    var newArrr = []
    for (let index = 0; index < arrlogg.length; index++) {
      const element = arrlogg[index];
      if (age_two == '') {
        pendingarr.push(JSON.parse(JSON.stringify(element)))
      }
      else if (element.user.id == age_two) {
        console.log('adddd3');
        pendingarr.push(JSON.parse(JSON.stringify(element)))
      }
    }
    setDatalist_two_tree(pendingarr)
    setDatalist_two(pendingarr)
    console.log(pendingarr, 'fffffffff');

  }, [arrlogg, age_two]);
  const Header = [
    { id: 1, name: "Locations" },
    { id: 2, name: "time of starting audit" },
    { id: 3, name: " duration for audit" },
    { id: 4, name: "GPS location for audit" },
    { id: 5, name: "Auditor name" },
    { id: 6, name: 'inspector photo' },
    // { id: 7, name: "Date Time " },
    { id: 7, name: "Score" },
    // { id: 8, name: "Review by" },
    { id: 8, name: "PDF " },
  ];

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const Hgfsffsgsgs = (startDate, endDate) => {
    var searchdata = dataList_two;
    var startDateFormate = moment(startDate, "DD/MM/YYYY");
    var endDateFormate = moment(endDate, "DD/MM/YYYY");
    searchdata = dataList_two.filter((item) => {
      var compareDate = moment(new Date(item.createdAt), "DD/MM/YYYY");
      if (!!startDate && endDate == null) {
        return compareDate.isAfter(startDateFormate)
      } else if (!!startDate && !!endDate) {
        return compareDate.isBetween(startDateFormate, endDateFormate)

      } else if (!!endDate && startDate == null) {
        return compareDate.isBefore(endDateFormate)
      } else {
        return item;
      }
    })
    setDatalist_two(searchdata)
  }
  // console.log(props, "props_____");



  React.useEffect(() => {
    if (!!props.profile && !!props.profile.token) {
      setCustomerList(props.userList);
      setCustomer(props.userList);
      getAuditList();
      getAuditorList()
    }
  }, [props.userList]);
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const ActiveArr = [];
    const DeletedArr = [];
    for (let index = 0; index < auditData.length; index++) {
      const element = auditData[index];
      {
        ActiveArr.push(element);
        DeletedArr.push(element);
      }
      console.log(element);
    }
    setActiveSearch(ActiveArr);
    setActiveData(ActiveArr);
    setDeletedSearch(DeletedArr);
    setDeleteddata(DeletedArr);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ae802c",
      },
    },
  });
  const getLocationList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.LOCATION_LIST,
      null,
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        setHotelData(data.data);
        // setHotelSearch(data.data);
      }
    }
    setUserRender(false);
  };
  React.useEffect(() => {
    if (props && props.profile && userRender) {
      getLocationList();
      setUserRender(false);
    }
  }, [props, userRender]);
  return (
    <Grid container>
      <Grid container display={"flex"} className={styles.hadpeg}>
        <Grid item sm={12} md={3} xs={12}>

        </Grid>
        <Grid item md={9} display={'flex'} justifyContent={'end'} alignItems={'center'}>
          <Button className={styles.butt_sjjshhsgs} onClick={() => {
             Hgfsffsgsgs('', ''),
           setStartDate('');
           setEndDate('')
           setDatalist_two(dataList)
           setAge('')
           setAge_two('')
            }}>
            Reset
          </Button>
          <DatePickerll
            placeholderText="Start Date"
            dateFormat="dd MMMM yyyy"
            className={styles.addfast_datepickerll}
            selected={startDate}
            onChange={
              (date) => {
                //@ts-ignore
                setStartDate(date);
                Hgfsffsgsgs(date, endDate)


              }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={today}
          />
          <DatePickerll
            placeholderText="End Date"
            dateFormat="dd MMMM yyyy"
            className={styles.addfast_datepickerll}
            selected={endDate}
            onChange={
              (date) => {
                //@ts-ignore
                setEndDate(date);
                Hgfsffsgsgs(startDate, date)
                // handleSearch(search, startDate, date);
                console.log('clicked end');
              }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={today}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Locations</InputLabel>
            <Select
              className={styles.select_box_main_contenar}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Age"
              onChange={handleChange_select}
            >
              <MenuItem value="">
                None
              </MenuItem>
              {/* <MenuItem value="">none</MenuItem> */}
              {hotelsData_.map((item, index) => {
                return (
                  <MenuItem value={item.name} key={index}> {item.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Auditor Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={styles.select_box_main_contenar}
              value={age_two}
              label="Age"
              onChange={handleChange_select_two}
            >
              <MenuItem value="">
                None
              </MenuItem>
              {/* <MenuItem value="">none</MenuItem> */}
              {dataSearch.map((item, index) => {
                return (
                  <MenuItem value={item.id} key={index}> {item.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={12}>
          <div>
            <ThemeProvider theme={theme}>
              <Paper
                sx={{
                  width: "100%",
                  mb: 2,
                  padding: "0px",
                  paddingTop: "10px",
                }}
                className={styles.maentebal2}
              >
                <TableComponent
                  handleClickOpenTWO={handleClickOpenTWO}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  handleOpen_delete={handleOpen_delete}
                  data={dataList_two}
                  Header={Header}
                // tokenObj={tokenObj}
                />
                <TablePagination
                  rowsPerPageOptions={[7, 10, 25, 100]}
                  component="div"
                  className={styles.bakgvcal}
                  count={dataList_two.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </ThemeProvider>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

const calenderIcon = () => {
  return <img src="./image/calender.png" className="calenderimg" />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Audit_page);
