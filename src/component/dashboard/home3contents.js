import { Grid, Box, LinearProgress } from "@mui/material";
import style from "../../styles/dashboard.module.css";

import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import React, { useContext } from "react";
import SupportContext from "../../context/SupportContext";

import { createTheme } from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// import { Dashtablecomponent } from "../Dashtable/dashtablecomponent";
import TablePagination from "@mui/material/TablePagination";
import styles from "../../styles/user/paymenttable.module.css";
import Style from "../Auditor/auditor.module.css";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";


const Usercount = (props) => {
  const [signupCount, setSignupCount] = React.useState(0);
  const [activeCount, setActiveCount] = React.useState(0);
  const [inactiveCount, setInactiveCount] = React.useState(0);



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [aciveData, setActiveData] = React.useState([]);
  const [categoryList, setCategoryList] = React.useState([]);
  const [categorySearch, setCategorySearch] = React.useState([]);
  const [userRender, setUserRender] = React.useState(true);





  const { activeSupportId, setActiveSupportId, setActiveSupportObject } =
    useContext(SupportContext);

  const handleClick = (id = string, data = object) => {
    viewSupportMsg(key);
    setUserData(data);
  };

  const getdashgetdata = async () => {
    console.log("headers");
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {};
    props.props.loaderRef(true);
    console.log(props.props, "loaderref");
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.DASH_BOARD,
      JSON.stringify(body),
      headers
    );
    // console.log(data.data, "data____");

    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        setCategorySearch(data.data);
        setCategoryList(data.data);
      }
    }
    setUserRender(false);
  };
  const Header = [
    { id: 1, name: "Location Name" },
    { id: 2, name: "Auditor" },
    { id: 3, name: "Date Time " },
  ];

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ae802c",
      },
    },
  });
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };
  // React.useEffect(() => {
  //   if (!!props.profile && !!props.profile.token) {
  //     setCustomerList(props.userList);
  //     setCustomer(props.userList);
  //     getdashgetdata();
  //   }
  // }, [props.userList]);
  React.useEffect(() => {
    if (
      userRender &&
      props.props &&
      props.props.profile &&
      props.props.profile.token
    ) {
      getdashgetdata();
    }
  }, [props, userRender]);

  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleOpen_delete = () => {
    setDeleteOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
    }),
    onSubmit: (values) => {
      if (open == true) {
        onAddCategory();
      } else if (openEdit == true) {
        onEditCategory();
      }
      formik.resetForm();
    },
  });

  return (
    <>
      <Grid container spacing={4} style={{ flexWrap: "wrap" }}>
        <Grid item xs={12} md={4} className={style.topgrid}>
          <Box className={style.singdiv}>
            <Box>
              <div className={style.threeuser}>
                <img src="./image/3 User.svg" />
              </div>
              <p className={style.signnum}>{signupCount} </p>
              <p className={style.signtxt}>Number Of Locations</p>
            </Box>
            {/* <Box
              sx={{ width: "153px", color: "red" }}
              className={style.signuserbox}
            >
              <LinearProgress
                variant="determinate"
                value={80}
                height="8"
                className={style.signuser}
                id={style.linegrf}
              />
            </Box> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className={style.topgrid}>
          <Box className={style.singdiv2}>
            <Box>
              <Box>
                <div className={style.myprofile}>
                  <img src="./image/myprofile.svg" />
                </div>
              </Box>
              <p className={style.signnum}> {activeCount} </p>
              <p className={style.signtxt}>Number Of Auditors</p>
            </Box>
          </Box>
        </Grid>
      </Grid>

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
                setPage(0);
                var value = e.target.value;
                //  onChange={(e) => setText(e.target.value)}
                if (typeof value !== "object") {
                  if (!value || value == "") {
                    setCategoryList(categorySearch);
                  } else {
                    var filteredData = categorySearch.filter((item) => {
                      let searchValue = item.name.toLowerCase();
                      return searchValue.includes(
                        value.toString().toLowerCase()
                      );
                    });
                    setCategoryList(filteredData);
                  }
                }
              }}
            />
            </Box>
          </Grid>
        </Grid>

        {/* <Grid container>
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
                <Dashtablecomponent
                  handleClickOpenTWO={handleClickOpenTWO}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  handleOpen_delete={handleOpen_delete}
                  data={dataList}
                  Header={Header}
                  // tokenObj={tokenObj}
                />
                <TablePagination
                  rowsPerPageOptions={[7, 10, 25, 100]}
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
      </Grid> */}

        <Grid container>
          <Grid item xs={12} md={12}>
            <div>
              <Box sx={{ width: "100%" }}>
                <Paper
                  sx={{ width: "100%", mb: 2 }}
                  className={styles.maentebal2}
                >
                  <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                      <TableHead>
                        <TableRow className={Style.TableRow}>
                          {Header.map((item, index) => {
                            return (
                              <TableCell
                                key={item.id}
                                className={Style.table_cell}
                              >
                                {item.name}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? categoryList.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : categoryList
                        ).map((item, index) => {
                          console.log(item, "item__");

                          return (
                            <TableRow
                              // className={currentPath == "./dashboard" ? Style.active : ""}
                              key={index}
                            >
                              <TableCell className={Style.table_cell}>
                                {item.location_name}
                              </TableCell>
                              <TableCell className={Style.table_cell}>
                                {item.location_head_staff}
                              </TableCell>
                              <TableCell className={Style.table_cell}>
                                {moment(item.createdAt).format("DD/MM/YYYY")}
                                {item.location_timing}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[7, 10, 25, 100]}
                    component="div"
                    className={styles.bakgvcal}
                    count={categoryList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Usercount;
