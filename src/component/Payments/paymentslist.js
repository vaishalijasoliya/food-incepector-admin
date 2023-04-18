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

const EnhancedTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [categoryList, setCategoryList] = React.useState([]);
  const [categorySearch, setCategorySearch] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: () => {
      const userData = {
        userId: user.id,
        name: formik.values.userName,
      };
      dispatchStore(userActions.userProfileupdate_(userData, nextpage));
    },
  });

  React.useEffect(() => {
    setCategorySearch(categoryData);
    setCategoryList(categoryData);
  }, []);

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
            <Button_ handleClick={handleClose_delete} text={"Cancle"} />
            <Button_ handleClick={handleClose_delete} text={"Delete"} />{" "}
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
                      let searchValue = item.category.toLowerCase();
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
            maxWidth={"md"}
            open={open}
            onClose={handleClose}
            key={1}
          >
            <DialogTitle className={styles.addtitalaja}>
              Add Category
            </DialogTitle>
            <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
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
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Category"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="category"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.category}
                    />
                    <Box className={"error_text_view"}>
                      {formik.errors.category && formik.touched.category && (
                        <Input_error text={formik.errors.category} />
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
        </Grid>
      </Grid>

      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openEdit}
        onClose={handleCloseEdit}
        key={1}
      >
        <DialogTitle className={styles.addtitalaja}>Edit Category</DialogTitle>
        <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
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
            <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
              <Box className={"Input_box"}>
                <InputLable text={"Category"} fs={"12px"} />
                <TextField
                  className={"Input_field"}
                  name="category"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.category}
                />
                <Box className={"error_text_view"}>
                  {formik.errors.category && formik.touched.category && (
                    <Input_error text={formik.errors.category} />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <div className={styles.cesalbtncss}>
            <Button_ handleClick={handleCloseEdit} text={"Cancle"} />
            <Button_ handleClick={handleCloseEdit} text={"Edit"} />{" "}
          </div>
        </Box>
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
                        <TableRow>
                          <TableCell>{item.category}</TableCell>
                          <TableCell className="content_end">
                            <Box style={{ display: "flex" }}>
                              <IconButton className="icon_btn" onClick={handleOpen_delete}>
                                <DeleteIcon_ height={15} width={15} />
                              </IconButton>
                              <IconButton
                                className="icon_btn"
                                onClick={handleClickOpenEdit}
                              >
                                <Editicon height={15} width={15} />
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

const calenderIcon = () => {
  return <img src="./image/calender.png" className="calenderimg" />;
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
