
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
import { TabPanel, a11yProps } from "../Tabs/tabs";
import { TableComponent } from "../Audit/tablecom_allqus";

const Auditor_page = (props) => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [customer, setCustomer] = React.useState([]);
  const [customerList, setCustomerList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);
  const [dataSearch, setDataSearch] = React.useState([]);
  const [dataList, setDatalist] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [aciveData, setActiveData] = React.useState([]);
  const [deletedData, setDeleteddata] = React.useState([]);
  const [activeSearch, setActiveSearch] = React.useState([]);
  const [deletedSearch, setDeletedSearch] = React.useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

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
  const Header = [
    {  name: "Catogory" },
    {  name: "Questions" },
    {  name: "Images" },
    {  name: "Compliance" },
    {  name: "Observation" },
  ];

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    console.log(props.userList, "props.userList");
    if (!!props.profile && !!props.profile.token) {
      setCustomerList(props.userList);
      setCustomer(props.userList);
    }
  }, [props.userList]);
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
                if (value == 0) {
                  var value_ = e.target.value;
                  if (typeof value_ !== "object") {
                    if (!value_ || value_ == "") {
                      setActiveData(activeSearch);
                    } else {
                      var filteredData = activeSearch.filter((item) => {
                        let searchValue = item.qustion.toLowerCase();
                        return searchValue.includes(
                          value_.toString().toLowerCase()
                        );
                      });
                      setActiveData(filteredData);
                    }
                  }
                } else {
                  var value_ = e.target.value;
                  if (typeof value_ !== "object") {
                    if (!value_ || value_ == "") {
                      setDeleteddata(deletedSearch);
                    } else {
                      var filteredData = deletedSearch.filter((item) => {
                        let searchValue = item.name.toLowerCase();
                        return searchValue.includes(
                          value_.toString().toLowerCase()
                        );
                      });
                      setDeleteddata(filteredData);
                    }
                  }
                }
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
                <TabPanel value={value} index={0}>
                  <TableComponent
                    handleClickOpenTWO={handleClickOpenTWO}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleOpen_delete={handleOpen_delete}
                    data={aciveData}
                    Header={Header}
                  />
                  <TablePagination
                    rowsPerPageOptions={[7, 10, 25, 100]}
                    component="div"
                    className={styles.bakgvcal}
                    count={aciveData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TableComponent
                    handleClickOpenTWO={handleClickOpenTWO}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleOpen_delete={handleOpen_delete}
                    data={deletedData}
                    Header={Header}
                  />
                  <TablePagination
                    rowsPerPageOptions={[7, 10, 25, 100]}
                    component="div"
                    className={styles.bakgvcal}
                    count={deletedData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TabPanel>
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

export default connect(mapStateToProps, mapDispatchToProps)(Auditor_page);
