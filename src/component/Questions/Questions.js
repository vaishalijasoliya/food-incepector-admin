import * as React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import styles from "../../styles/user/paymenttable.module.css";
import Style from "./question.module.css";
import { questionData } from "../Utils/data";
import { DeleteIcon_, Editicon } from "../Utils/icons";
import { useFormik } from "formik";
import { Button_ } from "../../Layout/buttons";
import * as Yup from "yup";
import { InputLable } from "../../Layout/inputlable";
import { Input_error } from "../Utils/string";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
import { Error_msg } from "../Utils/message";
const options = [
  { label: "Option 1_______-", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];
const Questions_page = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [questionData_, setQuestionData] = React.useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [questionSearch, setQuestionSearch] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(options[0].value);
  const [categoryDetails, setCategoryDetails] = React.useState("");
  const [userRender, setUserRender] = React.useState(true);

  React.useEffect(() => {
    if (userRender) {
      getQuestionList();
    }
  }, [props, userRender]);

  const getQuestionList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
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
        setQuestionSearch(questionData);
        setQuestionData(questionData);
      }
    }
    setQuestionSearch(questionData);
    setQuestionData(questionData);
    setUserRender(false);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
    }),
    onSubmit: () => {
      if (formik.values.name && selectedOption) {
        if (open) {
          onAddQuestion();
        } else if (openEdit) {
          onEditQuestion();
        }
      }
    },
  });
  const onAddQuestion = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      name: formik.values.name,
      category: selectedOption,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.GetApiCall(
      ApiEndpoint.ADD_QUESTION,
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

    setOpen(false);
  };

  const onEditQuestion = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      name: formik.values.name,
      id: categoryDetails.id,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.GetApiCall(
      ApiEndpoint.EDIT_QUESTION,
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
    console.log(headers, body, "is_________body___is_edit", props);
  };

  const onDelete = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id: categoryDetails.id,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.GetApiCall(
      ApiEndpoint.DELETE_QUESTION,
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

    handleClose_delete();
  };

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Head = [
    { id: 1, name: "Name" },
    { id: 2, name: "category" },
    { id: 3, name: "Actions" },
  ];

  const onSearch = (e) => {
    var value_ = e.target.value;
    if (typeof value_ !== "object") {
      if (!value_ || value_ == "") {
        setQuestionData(questionSearch);
      } else {
        var filteredData = questionSearch.filter((item) => {
          let searchValue = item.name.toLowerCase();
          return searchValue.includes(value_.toString().toLowerCase());
        });
        setQuestionData(filteredData);
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleClose_delete = () => {
    setDeleteOpen(false);
  };

  const handleOpen_delete = () => {
    setDeleteOpen(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    formik.resetForm();
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  return (
    <Grid container>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openEdit}
        onClose={handleCloseEdit}
        key={1}
      >
        <DialogTitle className={styles.addtitalaja}>Edit Questions</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={12} sm={8} lg={8} xl={8} md={8}>
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
              <Grid item xs={12} sm={3} lg={3} xl={3} md={3}>
                <Box className={"Input_box"}>
                  <InputLable text={"Category"} fs={"12px"} />

                  <Select
                    value={selectedOption}
                    sx={{
                      "& 	.MuiSelect-select": {
                        padding: "7px 37px 7px 17px",
                      },
                      height: "44px",
                      "& .MuiOutlinedInput": {
                        border: "0px",
                      },
                      width: "100%",
                      border: "1px solid #484848",
                    }}
                    onChange={handleChange}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box className={"error_text_view"}>
                    {!selectedOption && (
                      <Input_error text={"Select a category"} />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <div className={styles.cesalbtncss}>
              <Button_ handleClick={handleCloseEdit} text={"Cancle"} />
              <Button_ type={"submit"} text={"Add"} />{" "}
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
          Delete Questions
        </DialogTitle>
        <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
          <Typography>Are you sure you want to delete Questions?</Typography>
          <div className={styles.cesalbtncss}>
            <Button_ handleClick={handleClose_delete} text={"Cancle"} />
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
                onSearch(e);
              }}
            />
          </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={9}>
          <Button className={styles.megobtn} onClick={handleClickOpen}>
            Add Questions
          </Button>
        </Grid>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
          key={1}
        >
          <DialogTitle className={styles.addtitalaja}>
            Add Questions
          </DialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} sm={8} lg={8} xl={8} md={8}>
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
                <Grid item xs={12} sm={3} lg={3} xl={3} md={3}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Category"} fs={"12px"} />

                    <Select
                      value={selectedOption}
                      sx={{
                        "& 	.MuiSelect-select": {
                          padding: "7px 37px 7px 17px",
                        },
                        height: "44px",
                        "& .MuiOutlinedInput": {
                          border: "0px",
                        },
                        width: "100%",
                        border: "1px solid #484848",
                      }}
                      onChange={handleChange}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <Box className={"error_text_view"}>
                      {!selectedOption && (
                        <Input_error text={"Select a category"} />
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <div className={styles.cesalbtncss}>
                <Button_ handleClick={handleClose} text={"Cancle"} />
                <Button_ type={"submit"} text={"Add"} />{" "}
              </div>
            </Box>
          </form>
        </Dialog>
      </Grid>
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
                    {" "}
                    <TableHead>
                      <TableRow>
                        {Head.map((item) => {
                          return (
                            <TableCell
                              key={item.id}
                              className={Style.table_head_cell}
                              style={{
                                textAlign:
                                  item.name == "category"
                                    ? "left"
                                    : item.name == "Actions"
                                    ? "right"
                                    : "left",
                              }}
                            >
                              {item.name}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? questionData_.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : questionData_
                      ).map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.company}</TableCell>
                            <TableCell className="content_end">
                              <Box style={{ display: "flex" }}>
                                <IconButton
                                  className="icon_btn"
                                  onClick={handleClickOpenEdit}
                                >
                                  <Editicon height={15} width={15} />
                                </IconButton>
                                <IconButton
                                  className="icon_btn"
                                  onClick={() => {
                                    handleOpen_delete();
                                    setCategoryDetails(item);
                                  }}
                                >
                                  <DeleteIcon_ height={15} width={15} />
                                </IconButton>
                              </Box>
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
                  count={questionData_.length}
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

export default connect(mapStateToProps, mapDispatchToProps)(Questions_page);
