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
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import * as Yup from "yup";
import { Input_error } from "../Utils/string";
import { TabPanel, a11yProps } from "../Tabs/tabs";
import { TableComponent } from "./tableComponent";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
import { Error_msg } from "../Utils/message";

const Auditor_page = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [dataList, setDatalist] = React.useState([]);
  const [deletedData, setDeleteddata] = React.useState([]);
  const [dataSearch, setDataSearch] = React.useState([]);
  const [deletedSearch, setDeletedSearch] = React.useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [auditorRender, setAuditorRender] = React.useState(true);
  const [auditorDetails, setAuditorDetails] = React.useState("");
  const [userType, setUsertype] = React.useState("active");
  const [imageId, setImageId] = React.useState("");
  const [userProfileImage, setUserProfileImage] = React.useState("");
  const [isResetPassword, setIsresetPassword] = React.useState(false);
  const [listlegveg, setLegvg] = React.useState('')
  console.log(props,'propsprops')
  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
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

  console.log(auditorDetails, "auditorDetails___________");

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
    { id: 2, name: listlegveg=='pl_PL'?"الاسم الكامل":"Full name" },
    { id: 3, name:listlegveg=='pl_PL'? "اسم الشركة":"company name" },
    { id: 4, name:listlegveg=='pl_PL'? "اسم المستخدم":"username" },
    { id: 5, name: listlegveg=='pl_PL'?"فعل":"action" },
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
      userName: Yup.string().required(listlegveg=='pl_PL'?"اسم المستخدم مطلوب.":"Username is required."),
      password: Yup.string().required(listlegveg=='pl_PL'?"كلمة المرور مطلوبة.":"Password is required."),
      name: Yup.string().required(listlegveg=='pl_PL'?"مطلوب اسم":"Name is required"),
      company: Yup.string().required(listlegveg=='pl_PL'?"اسم الشركة مطلوب":"Company name is required"),    }),
    onSubmit: () => {
      onAddAuditor();
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      userName: "",
      name: "",
      company: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required(listlegveg=='pl_PL'?"اسم المستخدم مطلوب.":"Username is required."),
      name: Yup.string().required(listlegveg=='pl_PL'?"مطلوب اسم":"Name is required"),
      company: Yup.string().required(listlegveg=='pl_PL'?"اسم الشركة مطلوب":"Company name is required"),
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
      "x-access-token": props.profile.token,
    };
    var body = {
      type: userType,
    };
    props.props.loaderRef(true);
    console.log(props.props, "loaderrefauditor");

    var data = await ApiServices.PostApiCall(
      ApiEndpoint.AUDITOR_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        setDataSearch(data.data);
        setDatalist(data.data);
      }
    }

    setAuditorRender(false);
  };
  const onAddAuditor = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };

    var body = {
      name: formik.values.name,
      user_name: formik.values.userName,
      password: formik.values.password,
      role: "incepector",
      company_name: formik.values.company,
    };

    if (imageId) {
      body.id_item_profile = imageId;
    }

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADD_AUDITOR,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

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
      "x-access-token": props.profile.token,
    };
    var body = {
      id_auditor: auditorDetails,
      name: formikEdit.values.name,
      company_name: formikEdit.values.company,
      user_name: formikEdit.values.userName,
      password: formikEdit.values.password,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.EDIT_AUDITOR,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

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
      "x-access-token": props.profile.token,
    };
    var body = {
      id_auditor: id_user,
    };

    // props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.VIEW_AUDITOR,
      JSON.stringify(body),
      headers
    );
    // props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        formikEdit.setFieldValue("userName", data.data.user_name);
        formikEdit.setFieldValue("name", data.data.name);
        formikEdit.setFieldValue("company", data.data.company_name);
        console.log(data, "is_______data");
        setIsresetPassword(data.data.password_reset);
        setAuditorDetails(data.data.id);
        setUserProfileImage(data.data.profile_url);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
  };
  const onDelete = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_auditor: auditorDetails.id,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.DELETE_AUDITOR,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        toast.success(data.message);
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
        "x-access-token": props.profile.token,
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

  React.useEffect(() => {
    if (auditorRender && props && props.profile && props.profile.token) {
      getAuditorList();
    }
  }, [props, auditorRender, userType]);

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
              placeholder={listlegveg=='pl_PL'?"يبحث":"search"}
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
        
          {listlegveg=='pl_PL'?"إضافة المدقق":"Add Auditor"}
          </Button>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
            key={1}
          >
            <DialogTitle className={styles.addtitalaja}>
            {listlegveg=='pl_PL'?"إضافة المدقق":"Add Auditor"}
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
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
                          src={userProfileImage}
                        />
                      </Box>

                      <IconButton className={styles.Change_profile_icon_btn}>
                        <input
                          type="file"
                          name="myImage"
                          onChange={uploadItem}
                        />
                        <AddRoundedIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=='pl_PL'?"أدخل الاسم":"Enter name"} fs={"12px"} />
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
                      <InputLable text={listlegveg=='pl_PL'?"اسم المستخدم":"Username"} fs={"12px"} />
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
                      <InputLable text={listlegveg=='pl_PL'?"اسم الشركة":"Company name"} fs={"12px"} />
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
                      <InputLable text={listlegveg=='pl_PL'?"كلمة المرور":"Password"} fs={"12px"} />
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
                <div className={styles.cesalbtncss}>
                  <Button_ handleClick={handleClose} text={listlegveg=='pl_PL'?"يلغي":"Cancel"} />
                  <Button_ type="submit" text={listlegveg=='pl_PL'?"يضيف":"Add"} />{" "}
                </div>
              </Box>
            </form>
          </Dialog>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={openTWO}
            onClose={handleCloseTWO}
          >
            <DialogTitle className={styles.addtitalaja}>
            {listlegveg=='pl_PL'?"تحرير المدقق":
              "Edit Auditor"}
            </DialogTitle>
            <form onSubmit={formikEdit.handleSubmit}>
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
                      <InputLable text={listlegveg=='pl_PL'?"أدخل الاسم":"Enter name"} fs={"12px"} />
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
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=='pl_PL'?"اسم المستخدم":"Username"} fs={"12px"} />
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
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=='pl_PL'?"اسم الشركة":"Company name"} fs={"12px"} />
                      <TextField
                        className={"Input_field"}
                        name="company"
                        onBlur={formikEdit.handleBlur}
                        onChange={formikEdit.handleChange}
                        value={formikEdit.values.company}
                      />
                      <Box className={"error_text_view"}>
                        {formikEdit.errors.company &&
                          formikEdit.touched.company && (
                            <Input_error text={formikEdit.errors.company} />
                          )}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=='pl_PL'?"كلمة المرور":"Password"} fs={"12px"} />
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
                <div className={styles.cesalbtncss}>
                  <Button_ handleClick={handleCloseTWO} text={listlegveg=='pl_PL'?"يلغي":"Cancel"} />
                  <Button_ type={"submit"} text={listlegveg=='pl_PL'?"يحرر":"Edit"} />{" "}
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
            {listlegveg=='pl_PL'?"حذف المدقق":
              "Delete Auditor"}
            </DialogTitle>
            <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
              <Typography>
              {listlegveg=='pl_PL'?"هل أنت متأكد أنك تريد حذف المفتش":
                "Are you sure you want to delete Inspector?"}
              </Typography>
              <div className={styles.cesalbtncss}>
                <Button_ handleClick={handleClose_delete} text={listlegveg=='pl_PL'?"يلغي":"Cancel"} />
                <Button_ handleClick={onDelete} text={listlegveg=='pl_PL'?"يمسح":"Delete"} />{" "}
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
                    label={listlegveg=='pl_PL'?"نشيط":"Active"}
                    {...a11yProps(0)}
                  />
                  <Tab
                    className={Tabbar_style.tab_btns}
                    label={listlegveg=='pl_PL'?"تم الحذف":"Deleted"}
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

export default connect(mapStateToProps, mapDispatchToProps)(Auditor_page);
