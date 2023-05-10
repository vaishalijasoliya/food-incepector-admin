import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styles from "../../styles/user/paymenttable.module.css";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import { categoryData } from "../Utils/data";
import { DeleteIcon_, Editicon } from "../Utils/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputLable } from "../../Layout/inputlable";
import { Input_error } from "../Utils/string";
import { Button_ } from "../../Layout/buttons";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
import { Error_msg } from "../Utils/message";

const EnhancedTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [categoryList, setCategoryList] = React.useState([]);
  const [categorySearch, setCategorySearch] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [userRender, setUserRender] = React.useState(true);
  const [categoryDetails, setCategoryDetails] = React.useState("");

  console.log(props);

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

  const onViewCategory = async ({ id_user }) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_category: id_user,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.VIEW_CATEGORY,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        formik.setFieldValue("name", data.data.name);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
  };

  const onAddCategory = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {
      name: formik.values.name,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADD_CATEGORY,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
    getCategoryList();
    setOpen(false);
  };

  const onEditCategory = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      name: formik.values.name,
      id_category: categoryDetails.id,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.EDIT_CATEGORY,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (data) {
      if (data.status) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }

    setOpenEdit(false);
    getCategoryList();
  };

  const onDelete = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_category: categoryDetails.id,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.DELETE_CATEGORY,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        getCategoryList();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
    handleClose_delete();
  };

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    formik.resetForm();
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose_delete = () => {
    setDeleteOpen(false);
  };

  const handleOpen_delete = () => {
    setDeleteOpen(true);
  };
  const getCategoryList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {};
    
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.CATEGORY_LIST,
      JSON.stringify(body),
      headers  
    );
    console.log(data, "data____")
  
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        setCategorySearch(data.data);
        setCategoryList(data.data);
      }
    }
    setUserRender(false);
  };
  React.useEffect(() => {
    if (
      userRender &&
      props.props &&
      props.props.profile &&
      props.props.profile.token
    ) {
      getCategoryList();
    }
  }, [props, userRender]);

  return (
    <Grid container>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={deleteOpen}
        onClose={handleClose_delete}
      >
        <DialogTitle className={styles.addtitalaja}>
          Delete Category
        </DialogTitle>
        <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
          <Typography>Are you sure you want to delete Category?</Typography>
          <div className={styles.cesalbtncss}>
            <Button_ handleClick={handleClose_delete} text={"Cancel"} />
            <Button_ handleClick={onDelete} text={"Delete"} />{" "}
          </div>
        </Box>
      </Dialog>
      <Grid container display={"flex"} className={styles.hadpeg}>
        <Grid className={styles.inputbox} item xs={12} md={3}>
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
        <Grid className={styles.maxbox} item xs={12} md={9}>
          <Button className={styles.megobtn} onClick={handleClickOpen}>
            Add Category
          </Button>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
            key={1}
          >
            <DialogTitle className={styles.addtitalaja}>
              Add Category
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                    <Box className={"Input_box"}>
                      <InputLable text={"Name"} fs={"12px"} />
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
                </Grid>
                <div className={styles.cesalbtncss}>
                  <Button_ handleClick={handleClose} text={"Cancel"} />
                  {/* <Button type="submit">Add</Button> */}
                  <Button_
                    type={"submit"}
                    // handleClick=s{() => formik.handleSubmit()}
                    text={"Add"}
                  />
                </div>
              </Box>
            </form>
          </Dialog>
        </Grid>
      </Grid>

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openEdit}
        onClose={handleCloseEdit}
        key={1}
      >
        <DialogTitle className={styles.addtitalaja}>Edit Category</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                <Box className={"Input_box"}>
                  <InputLable text={"Name"} fs={"12px"} />
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
            </Grid>
            <div className={styles.cesalbtncss}>
              <Button_ handleClick={handleCloseEdit} text={"Cancel"} />
              <Button_ type={"submit"} text={"Edit"} />
            </div>
          </Box>
        </form>
      </Dialog>

      <Grid container>
        <Grid item xs={12} md={12}>
          <div>
            <Box sx={{ width: "100%" }}>
              <Paper
                sx={{ width: "100%", mb: 2 }}
                className={styles.maentebal2}
              >
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                  >
                    {" "}
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.addnmejdhd}>
                          Name
                        </TableCell>
                        <TableCell
                          style={{
                            textAlign: "right",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {(rowsPerPage > 0
                      ? categoryList.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : categoryList
                    ).map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="content_end">
                            <Box style={{ display: "flex" }}>
                              <IconButton
                                className="icon_btn"
                                onClick={() => {
                                  handleClickOpenEdit();
                                  setCategoryDetails(item);
                                  onViewCategory({ id_user: item.id });
                                }}
                              >
                                <Editicon height={15} width={15} />
                              </IconButton>
                              <IconButton
                                className="icon_btn"
                                onClick={() => {
                                  setCategoryDetails(item);
                                  handleOpen_delete();
                                }}
                              >
                                <DeleteIcon_ height={15} width={15} />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
