import * as React from "react";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import styles from "../../styles/user/paymenttable.module.css";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Dialog,
  IconButton,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { qustionlist } from "../Utils/data";
import { TableComponent } from "../Audit/tablecom_allqus";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { useRouter } from "next/router";

const AUDIT_VIEW_PAGE = (props) => {
  console.log(props, "props");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [dataSearch, setDataSearch] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);
  const [value, setValue] = React.useState(0);
  // const [aciveData, setActiveData] = React.useState([]);
  // const [deletedData, setDeleteddata] = React.useState([]);
  // const [activeSearch, setActiveSearch] = React.useState([]);
  // const [deletedSearch, setDeletedSearch] = React.useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [dataList, setDatalist] = React.useState([]);
  // const [questionData_, setQuestionData] = React.useState([]);
  

  // const loaderRef = {
  //     token: "is____token",
  //    }
// console.log(loaderRef, "loaderrefff__")

  const router = useRouter();
  console.log(router.query.id, "router");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setDataSearch([]);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };

  // const handleCloseTWO = () => {
  //   setOpenTWO(false);
  //   formik.resetForm();
  // };

  // const handleClose_delete = () => {
  //   setDeleteOpen(false);
  // };

  const handleOpen_delete = () => {
    setDeleteOpen(true);
  };

  //  console.log(props.profile.token, 'profile____')

  const getAuditorList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_audit: router.query.id,
    };
    props.props.loaderRef(true);
    // console.log(props, "propsssss_____")
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.AUDIT_VIEW,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    console.log(data.data[0].qustionlist, data, "api_res_qus");
    if (data) {
      if (data.status) {
        setDatalist(data.data);
        setDataSearch(data.data);
        // setQuestionData(data.data);
        // setQuestionSearch(data.data);
      }
    }
  };


  const Header = [
    { name: "Catogory" },
    { name: "Questions" },
    { name: "Images" },
    { name: "Compliance" },
    { name: "Observation" },
  ];


  const onSearch = (e) => {
    var value_ = e.target.value;
    if (typeof value_ !== "object") {
      if (!value_ || value_ == "") {
        setDatalist(dataSearch);
      } else {
        var filteredData = dataSearch.filter((item) => {
          let searchValue = item.name.toLowerCase();
          return searchValue.includes(value_.toString().toLowerCase());
        });
        setDatalist(filteredData);
      }
    }
  };


  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  // console.log(props, "propscheck_____");
  React.useEffect(() => {
    console.log(router.query.id,"___function")
    
    if (router.query.id && props.profile.token) {
      console.log(router.query.id, "id_______")
      getAuditorList();
    }
    
  }, [router.query.id] );
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const ActiveArr = [];
    const DeletedArr = [];
    for (let index = 0; index < qustionlist.length; index++) {
      const element = qustionlist[index];
      {
        ActiveArr.push(element);
        DeletedArr.push(element);
      }
      console.log(element);
    }
    // setActiveSearch(ActiveArr);
    // setActiveData(ActiveArr);
    // setDeletedSearch(DeletedArr);
    // setDeleteddata(DeletedArr);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ae802c",
      },
    },
  });

  console.log(dataList, 'dataList')

  return (
    <Grid container>
      <Grid container display={"flex"} className={styles.hadpeg}>
        <Grid className={styles.inputbox} item sm={12} md={3} xs={12}>
          <Box className={styles.boxreting} display={"flex"}>
          <input
              type="text"
              id="myserchbtn"
              name="search"
              placeholder="Search"
              className={styles.searchbtn}
              autoComplete="off"
              onChange={(e) => {
                onSearch(e);
              }}
            />
          </Box>
        </Grid>
      </Grid>

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
                data={dataList}
                Header={Header}
                // loaderref={loaderRef}
              />
              <TablePagination
                rowsPerPageOptions={[7, 10, 25, 100] }
                component="div"
                className={styles.bakgvcal}
                count={dataList.length}
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

export default connect(mapStateToProps, mapDispatchToProps)(AUDIT_VIEW_PAGE);
