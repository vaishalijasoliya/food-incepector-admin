import * as React from "react";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import styles from "../../styles/user/paymenttable.module.css";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { Button_ } from "../../Layout/buttons";
import Tabbar_style from "../../styles/tabbar.module.css";
import { InputLable } from "../../Layout/inputlable";
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
import { auditorData } from "../Utils/data";
import { useFormik } from "formik";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import * as Yup from "yup";
import { Input_error } from "../Utils/string";
import { TabPanel, a11yProps } from "../Tabs/tabs";
import { TableComponent } from "./tableComponent";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";

const Auditor_page = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [aciveData, setActiveData] = React.useState([]);
  const [deletedData, setDeleteddata] = React.useState([]);
  const [activeSearch, setActiveSearch] = React.useState([]);
  const [deletedSearch, setDeletedSearch] = React.useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [auditorRender, setAuditorRender] = React.useState(true);

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
    // { id: 1, name: "Index" },
    { id: 2, name: "Full name" },
    { id: 3, name: "company name" },
    { id: 4, name: "username" },
    { id: 5, name: "action" },
  ];

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      name: "",
      password: "",
      company: "",
    },

    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required."),
      password: Yup.string().required("Password is required."),
      name: Yup.string().required("Name is required"),
      company: Yup.string().required("Company name is required"),
    }),
    onSubmit: () => {
      //   router.push("/dashboard");
    },
  });

  const getAuditorList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.GetApiCall(
      ApiEndpoint.INSPECTOR_LIST,
      // JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        const ActiveArr = [];
        const DeletedArr = [];
        for (let index = 0; index < auditorData.length; index++) {
          const element = auditorData[index];
          if (element.status == "active") {
            ActiveArr.push(element);
          } else if (element.status == "deleted") {
            DeletedArr.push(element);
          }
        }
        setActiveSearch(ActiveArr);
        setActiveData(ActiveArr);
        setDeletedSearch(DeletedArr);
        setDeleteddata(DeletedArr);
      }
    }
    const ActiveArr = [];
    const DeletedArr = [];
    for (let index = 0; index < auditorData.length; index++) {
      const element = auditorData[index];
      if (element.status == "active") {
        ActiveArr.push(element);
      } else if (element.status == "deleted") {
        DeletedArr.push(element);
      }
    }
    setActiveSearch(ActiveArr);
    setActiveData(ActiveArr);
    setDeletedSearch(DeletedArr);
    setDeleteddata(DeletedArr);
    setAuditorRender(false);
  };

  React.useEffect(() => {
    if (auditorRender) {
      getAuditorList();
    }
  }, [props, auditorRender]);

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
                        let searchValue = item.name.toLowerCase();
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
        <Grid className={styles.maxbox} item xs={12} md={9} sm={12}>
          <Button className={styles.megobtn} onClick={handleClickOpen}>
            Add Auditor
          </Button>
          <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={open}
            onClose={handleClose}
            key={1}
          >
            <DialogTitle className={styles.addtitalaja}>
              Add Auditor
            </DialogTitle>
            <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
              <Grid container justifyContent={"space-between"}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  xl={12}
                  lg={12}
                  className={styles.Image_user_item}
                >
                  <Box className={styles.Image_user_item_div}>
                    <Box className={styles.Profile_photo_div}>
                      <Avatar
                        className={styles.Profile_photo_avtar}
                        alt="user profile photo"
                        // src={userProfileImage}
                      />
                    </Box>

                    <IconButton className={styles.Change_profile_icon_btn}>
                      <input type="file" name="myImage" />
                      <AddRoundedIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Enter name"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <Box className={"error_text_view"}>
                      {formik.errors.name && formik.touched.name && (
                        <Input_error text={formik.errors.name} />
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Username"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="userName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                    />
                    <Box className={"error_text_view"}>
                      {formik.errors.userName && formik.touched.userName && (
                        <Input_error text={formik.errors.userName} />
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Company name"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="company"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.company}
                    />
                    <Box className={"error_text_view"}>
                      {formik.errors.company && formik.touched.company && (
                        <Input_error text={formik.errors.company} />
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Password"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Box className={"error_text_view"}>
                      {formik.errors.password && formik.touched.password && (
                        <Input_error text={formik.errors.password} />
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <div className={styles.cesalbtncss}>
                <Button_ handleClick={handleClose} text={"Cancle"} />
                <Button_ handleClick={handleClose} text={"Add"} />{" "}
              </div>
            </Box>
          </Dialog>
          <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={openTWO}
            onClose={handleCloseTWO}
          >
            <DialogTitle className={styles.addtitalaja}>
              Edit Auditor
            </DialogTitle>
            <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Enter name"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <Box className={"error_text_view"}>
                      {formik.errors.name && formik.touched.name && (
                        <Input_error text={formik.errors.name} />
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Username"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="userName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                    />
                    <Box className={"error_text_view"}>
                      {formik.errors.userName && formik.touched.userName && (
                        <Input_error text={formik.errors.userName} />
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Company name"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="company"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.company}
                    />
                    <Box className={"error_text_view"}>
                      {formik.errors.company && formik.touched.company && (
                        <Input_error text={formik.errors.company} />
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Password"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Box className={"error_text_view"}>
                      {formik.errors.password && formik.touched.password && (
                        <Input_error text={formik.errors.password} />
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <div className={styles.cesalbtncss}>
                <Button_ handleClick={handleCloseTWO} text={"Cancle"} />
                <Button_ handleClick={handleCloseTWO} text={"Add"} />{" "}
              </div>
            </Box>
          </Dialog>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={deleteOpen}
            onClose={handleClose_delete}
          >
            <DialogTitle className={styles.addtitalaja}>
              Delete Auditor
            </DialogTitle>
            <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
              <Typography>
                Are you sure you want to delete Inspector?
              </Typography>
              <div className={styles.cesalbtncss}>
                <Button_ handleClick={handleClose_delete} text={"Cancle"} />
                <Button_
                  handleClick={handleClose_delete}
                  text={"Delete"}
                />{" "}
              </div>
            </Box>
          </Dialog>
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
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  indicatorColor="primary"
                  className={Tabbar_style.Tab_container}
                  sx={{
                    "& .MuiTabs-flexContainer	": {
                      columnGap: "20px",
                    },
                  }}
                >
                  <Tab
                    className={Tabbar_style.tab_btns}
                    label="Active"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={Tabbar_style.tab_btns}
                    label="Deleted"
                    {...a11yProps(1)}
                  />
                </Tabs>
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
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auditor_page);
