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
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input_error } from "../Utils/string";
import { TabPanel, a11yProps } from "../Tabs/tabs";
import { TableComponent } from "./tableComponent";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
import { Error_msg } from "../Utils/message";
import { Loading } from "../../Layout/Loader";
import Style from "./subadmin.module.css";

const Subadmin = (prop) => {
  const { props, profile } = prop;
  console.log("props___________", props, profile);
  const Loader = props.loaderRef;
  const token = profile.token;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [dataList, setDatalist] = React.useState([]);
  const [dataSearch, setDataSearch] = React.useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [auditorRender, setAuditorRender] = React.useState(true);
  const [auditorDetails, setAuditorDetails] = React.useState("");
  const [userType, setUsertype] = React.useState("active");
  const [imageId, setImageId] = React.useState("");
  const [userProfileImage, setUserProfileImage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [adminEmail, setAdminEmail] = React.useState("");
  const [optionEmail, setOptionEmail] = React.useState("");
  const [listlegveg, setLegvg] = React.useState("");

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language");
    setLegvg(listtebal);
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setDataSearch([]);
    setDatalist([]);
    setAuditorRender(true);
    if (newValue == 1) {
      setUsertype("cancelled");
    } else if (newValue == 0) {
      setUsertype("active");
    }
  };

  console.log("auditorDetails___________", adminEmail);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setUserProfileImage("");
  };
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };

  const handleCloseTWO = () => {
    setOpenTWO(false);
    formik.resetForm();
    setUserProfileImage("");
  };

  const handleClose_delete = () => {
    setDeleteOpen(false);
  };

  const handleOpen_delete = () => {
    setDeleteOpen(true);
  };
  const Header = [
    // { id: 1, name: "Index" },
    { id: 2, name: listlegveg == "pl_PL" ? "الاسم الكامل" : "Full name" },

    { id: 4, name: listlegveg == "pl_PL" ? "اسم المستخدم" : "username" },
    { id: 5, name: listlegveg == "pl_PL" ? "فعل" : "action" },
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
    },
    validationSchema: Yup.object({
      userName: Yup.string().required(
        listlegveg == "pl_PL" ? "اسم المستخدم مطلوب." : "Username is required."
      ),
      password: Yup.string().required(
        listlegveg == "pl_PL" ? "كلمة المرور مطلوبة." : "Password is required."
      ),
      name: Yup.string().required(
        listlegveg == "pl_PL" ? "مطلوب اسم" : "Name is required"
      ),
    }),
    onSubmit: () => {
      onAddAdmin();
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      userName: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required(
        listlegveg == "pl_PL" ? "اسم المستخدم مطلوب." : "Username is required."
      ),
      name: Yup.string().required(
        listlegveg == "pl_PL" ? "مطلوب اسم" : "Name is required"
      ),
    }),
    onSubmit: () => {
      onEditAuditor();
      formikEdit.resetForm();
      setOpenTWO(false);
    },
  });

  const getAuditorList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
      //props.token,
    };
    var body = {
      type: userType,
    };
    setIsLoading(true);
    // props.loaderRef(true);
    console.log(props, "loaderrefauditor");

    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_LIST,
      JSON.stringify(body),
      headers
    );
    // props.loaderRef(false);
    setIsLoading(false);
    if (data) {
      if (data.status) {
        const Arr = [];
        // for (let index = 0; index < data.data.length; index++) {
        //   const element = data.data[index];
        //   // if (element.id !== profile.data.id) {
        //     Arr.push(element);
        //   }
        // }
        setDataSearch(data.data);
        setDatalist(data.data);
      }
    }
  };
  const onAddAdmin = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };

    var body = {
      name: formik.values.name,
      user_name: formik.values.userName,
      password: formik.values.password,
      role: "admin",
      company_name: "jio",
    };

    if (imageId) {
      body.id_item_profile = imageId;
    }
    setIsLoading(true);

    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADD_ADMIN,
      JSON.stringify(body),
      headers
    );
    setIsLoading(false);

    if (data) {
      if (data.status) {
        getAuditorList();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
    formik.resetForm();

    setOpen(false);
  };
  const onEditAuditor = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    var body = {
      id_auditor: auditorDetails.id,
      name: formikEdit.values.name,

      user_name: formikEdit.values.userName,
      password: formikEdit.values.password,
    };

    setIsLoading(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.EDIT_AUDITOR,
      JSON.stringify(body),
      headers
    );
    setIsLoading(false);

    if (data) {
      if (data.status) {
        toast.success(data.message);
        setAuditorDetails("");
        formikEdit.resetForm();
        getAuditorList();
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
  };
  const onViewEditor = async ({ id_user }) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    var body = {
      id_auditor: id_user,
    };

    setIsLoading(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.VIEW_AUDITOR,
      JSON.stringify(body),
      headers
    );
    setIsLoading(false);

    if (data) {
      if (data.status) {
        formikEdit.setFieldValue("userName", data.data.user_name);
        formikEdit.setFieldValue("name", data.data.name);
        // setAuditorDetails(data.data.id);
        setUserProfileImage(data.data.profile_url);
      } else {
        // toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
  };
  const onDelete = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    var body = {
      id_auditor: auditorDetails.id,
    };

    setIsLoading(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.DELETE_AUDITOR,
      JSON.stringify(body),
      headers
    );
    setIsLoading(false);

    if (data) {
      if (data.status) {
        toast.success("Delete successfully");
        setAuditorDetails("");
        getAuditorList();
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }

    handleClose_delete();
  };
  const uploadItem = async (e) => {
    var filename = e.target.files[0];
    var formData = new FormData();

    if (e.target.files[0]) {
      setUserProfileImage(URL.createObjectURL(filename));
      formData.append("file", filename);
      formData.append("type", "image");

      var header = {
        "x-access-token": token,
      };

      var requestOptions = {
        method: "POST",
        headers: header,
        body: formData,
        redirect: "follow",
      };

      const data = await fetch(ApiEndpoint.UPLOAD_FILE, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result;
        })
        .catch((error) => console.log("error", error));
      console.log(data, "is_____data____");

      if (!!data) {
        if (data.status == true) {
          toast.success("Successfully Image uploaded");
          setImageId(data.data.id);
        } else {
          toast.error(data.message ? data.message : "Image can't be upload");
        }
      }
    }
  };

  const getSettingEmail = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    setIsLoading(true);
    var data = await ApiServices.GetApiCall(ApiEndpoint.SETTING_EMAIL, headers);
    // props.loaderRef(false);
    setIsLoading(false);
    if (data) {
      if (data.status) {
        setAdminEmail(data.data[0].options_value);
        setOptionEmail(data.data[0].options);
      }
    }
  };

  const onUpdateSettingEmail = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": token,
    };
    var body = {
      options_value: adminEmail,
      options: optionEmail,
    };
    setIsLoading(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.UPDATE_EMAIL,
      JSON.stringify(body),
      headers
    );
    setIsLoading(false);
    if (data) {
      if (data.status) {
        toast.success(data.message);
        getSettingEmail();
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };

  React.useEffect(() => {
    getSettingEmail();
  }, []);

  React.useEffect(() => {
    if (profile && profile.token) {
      getAuditorList();
    }
  }, [userType, profile]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ae802c",
      },
    },
  });

  return (
    <Grid container>
      {isLoading && <Loading />}

      <Grid container display={"flex"} className={styles.hadpeg}>
        <Grid className={styles.inputbox} item sm={12} md={3} xs={12}>
          <Box className={styles.boxreting} display={"flex"}>
            <input
              type="text"
              id="myserchbtn"
              name="search"
              placeholder={listlegveg == "pl_PL" ? "يبحث" : "search"}
              className={styles.searchbtn}
              autoComplete="off"
              onChange={(e) => {
                var value_ = e.target.value;
                if (typeof value_ !== "object") {
                  if (!value_ || value_ == "") {
                    setDatalist(dataSearch);
                  } else {
                    var filteredData = dataSearch.filter((item) => {
                      let searchValue = item.name.toLowerCase();
                      return searchValue.includes(
                        value_.toString().toLowerCase()
                      );
                    });
                    setDatalist(filteredData);
                  }
                }
                // } else {
                //   var value_ = e.target.value;
                //   if (typeof value_ !== "object") {
                //     if (!value_ || value_ == "") {
                //       setDatalist(deletedSearch);
                //     } else {
                //       var filteredData = deletedSearch.filter((item) => {
                //         let searchValue = item.name.toLowerCase();
                //         return searchValue.includes(
                //           value_.toString().toLowerCase()
                //         );
                //       });
                //       setDatalist(filteredData);
                //     }
                //   }
                // }
              }}
            />
          </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={9} sm={12}>
          <Button className={styles.megobtn} onClick={handleClickOpen}>
            {listlegveg == "pl_PL" ? "إضافة المسؤول" : "Add Admin"}
          </Button>
          <Dialog
            fullWidth={false}
            maxWidth={"xs"}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle className={styles.addadmintitle}>
              {listlegveg == "pl_PL" ? "إضافة المسؤول" : "Add Admin"}
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
                <Grid container justifyContent={"center"}>
                  <Grid item md={12}>
                    <Box className={"Input_box"}>
                      <InputLable
                        text={
                          listlegveg == "pl_PL" ? "أدخل الاسم" : "Enter name"
                        }
                        fs={"12px"}
                      />
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
                    <Box className={"Input_box"}>
                      <InputLable
                        text={
                          listlegveg == "pl_PL" ? "اسم المستخدم" : "Username"
                        }
                        fs={"12px"}
                      />
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
                    <Box className={"Input_box"}>
                      <InputLable
                        text={
                          listlegveg == "pl_PL" ? "كلمة المرور" : "Password"
                        }
                        fs={"12px"}
                      />
                      <TextField
                        className={"Input_field"}
                        type="password"
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
                <div className={styles.adminbtncss}>
                  <Button_
                    handleClick={handleClose}
                    text={listlegveg == "pl_PL" ? "يلغي" : "Cancel"}
                  />
                  <Button_
                    type="submit"
                    text={listlegveg == "pl_PL" ? "يضيف" : "Add"}
                  />{" "}
                </div>
              </Box>
            </form>
          </Dialog>
          <Dialog
            fullWidth={false}
            maxWidth={"xs"}
            open={openTWO}
            onClose={handleCloseTWO}
          >
            <DialogTitle className={styles.addadmintitle}>
              {listlegveg == "pl_PL" ? "تحرير المسؤول" : "Edit Admin"}
            </DialogTitle>
            <form onSubmit={formikEdit.handleSubmit}>
              <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                    <Box className={"Input_box"}>
                      <InputLable
                        text={
                          listlegveg == "pl_PL" ? "أدخل الاسم" : "Enter name"
                        }
                        fs={"12px"}
                      />
                      <TextField
                        className={"Input_field"}
                        name="name"
                        onBlur={formikEdit.handleBlur}
                        onChange={formikEdit.handleChange}
                        value={formikEdit.values.name}
                      />
                      <Box className={"error_text_view"}>
                        {formikEdit.errors.name && formikEdit.touched.name && (
                          <Input_error text={formikEdit.errors.name} />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                    <Box className={"Input_box"}>
                      <InputLable
                        text={
                          listlegveg == "pl_PL" ? "اسم المستخدم" : "Username"
                        }
                        fs={"12px"}
                      />
                      <TextField
                        className={"Input_field"}
                        name="userName"
                        onBlur={formikEdit.handleBlur}
                        onChange={formikEdit.handleChange}
                        value={formikEdit.values.userName}
                      />
                      <Box className={"error_text_view"}>
                        {formikEdit.errors.userName &&
                          formikEdit.touched.userName && (
                            <Input_error text={formikEdit.errors.userName} />
                          )}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                    <Box className={"Input_box"}>
                      <InputLable
                        text={
                          listlegveg == "pl_PL" ? "كلمة المرور" : "Password"
                        }
                        fs={"12px"}
                      />
                      <TextField
                        className={"Input_field"}
                        name="password"
                        onBlur={formikEdit.handleBlur}
                        onChange={formikEdit.handleChange}
                        value={formikEdit.values.password}
                      />
                      <Box className={"error_text_view"}>
                        {formikEdit.errors.password &&
                          formikEdit.touched.password && (
                            <Input_error text={formikEdit.errors.password} />
                          )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <div className={styles.adminbtncss}>
                  <Button_
                    handleClick={handleCloseTWO}
                    text={listlegveg == "pl_PL" ? "يلغي" : "Cancel"}
                  />
                  <Button_
                    type={"submit"}
                    text={listlegveg == "pl_PL" ? "يحرر" : "Edit"}
                  />{" "}
                </div>
              </Box>
            </form>
          </Dialog>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={deleteOpen}
            onClose={handleClose_delete}
          >
            <DialogTitle className={styles.addtitalaja}>
              {listlegveg == "pl_PL" ? "حذف المسؤول" : "Delete Admin"}
            </DialogTitle>
            <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
              <Typography>
                {" "}
                {listlegveg == "pl_PL"
                  ? "هل أنت متأكد أنك تريد حذف المسؤول؟"
                  : "Are you sure you want to delete Admin?"}
              </Typography>
              <div className={styles.cesalbtncss}>
                <Button_
                  handleClick={handleClose_delete}
                  text={listlegveg == "pl_PL" ? "يلغي" : "Cancel"}
                />
                <Button_
                  handleClick={onDelete}
                  text={listlegveg == "pl_PL" ? "يمسح" : "Delete"}
                />{" "}
              </div>
            </Box>
          </Dialog>
        </Grid>
      </Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        className={styles.hadpeg}
        style={{ marginTop: "0px" }}
        alignItems={"flex-end"}
      >
        <Box className={"Input_box"} style={{ width: "80%" }}>
          <InputLable text={"Admin email"} fs={"12px"} />
          <TextField
            className={Style.adminEmail_}
            value={adminEmail}
            onChange={(event) => {
              setAdminEmail(event.target.value);
            }}
          />
        </Box>

        <Button className={Style.sendButton} onClick={onUpdateSettingEmail}>
          Send
        </Button>
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
                    label={listlegveg == "pl_PL" ? "نشيط" : "Active"}
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={Tabbar_style.tab_btns}
                    label={listlegveg == "pl_PL" ? "تم الحذف" : "Deleted"}
                    {...a11yProps(1)}
                  />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <TableComponent
                    handleClickOpenTWO={handleClickOpenTWO}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleOpen_delete={handleOpen_delete}
                    data={dataList}
                    onViewEditor={onViewEditor}
                    setAuditorDetails={setAuditorDetails}
                    Header={Header}
                    formik={formik}
                    formikEdit={formikEdit}
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TableComponent
                    handleClickOpenTWO={handleClickOpenTWO}
                    rowsPerPage={rowsPerPage}
                    onViewEditor={onViewEditor}
                    page={page}
                    handleOpen_delete={handleOpen_delete}
                    data={dataList}
                    Header={Header}
                    setAuditorDetails={setAuditorDetails}
                    formikEdit={formikEdit}
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

export default connect(mapStateToProps, mapDispatchToProps)(Subadmin);
