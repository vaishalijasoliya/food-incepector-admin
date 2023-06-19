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
  // const { profile } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [questionData_, setQuestionData] = React.useState([]);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [questionSearch, setQuestionSearch] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState("select_category");
  const [questionDetails, setQuestionDetails] = React.useState("");
  const [categoryList, setCategoryList] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [userRender, setUserRender] = React.useState(true);
  const [userToken, setUserToken] = React.useState(props.profile.token);
  const [count, setCount] = React.useState(0);
  const [listlegveg, setLegvg] = React.useState('')

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  const getCategoryList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {};
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.CATEGORY_LIST,
      null,
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        setCategoryList(data.data);
      }
    }
  };
  const getQuestionList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.GET_QUESTION,
      null,
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        setUserRender(false);
        console.log(data, "is______data_question");
        setQuestionSearch(data.data);
        setQuestionData(data.data);
      }
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const onViewCategory = async ({ id_user }) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_question: id_user,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.VIEW_QUESTION,
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

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(listlegveg=="pl_PL"?"مطلوب اسم.":"Name is required."),
    }),
    onSubmit: () => {
      setSubmitted(true);
      if (formik.values.name && selectedOption != "select_category") {
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
      id_category: selectedOption,
      name: formik.values.name,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
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
      id_question: questionDetails.id,
      id_category: selectedOption,
      name: formik.values.name,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.EDIT_QUESTION,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        toast.success(data.message);
        setQuestionDetails("");
        setSelectedOption("select_category");
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }

    setOpenEdit(false);
  };

  const onDelete = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_question: questionDetails.id,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
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
    { id: 1, name: listlegveg=="pl_PL"?"اسم":"Name" },
    { id: 2, name: listlegveg=="pl_PL"?"فئة":"category" },
    { id: 3, name: listlegveg=="pl_PL"?"أجراءات":"Actions" },
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

  const handleClickOpenEdit = async ({ id_user }) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_question: id_user,
    };

    // props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.VIEW_QUESTION,
      JSON.stringify(body),
      headers
    );

    console.log(data, "is______datat", body, headers);
    // props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        formik.setFieldValue("name", data.data.name);
        setSelectedOption(data.data.id_category);
        setOpenEdit(true);
      }
    }
  };

  React.useEffect(() => {
    if (userRender && props && props.profile && props.profile.token) {
      getCategoryList();
      getQuestionList();
      setUserRender(false);
    }
  }, [userRender]);

  return (
    <Grid container>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openEdit}
        onClose={handleCloseEdit}
        key={1}
      >
        <DialogTitle className={styles.addtitalaja}>{listlegveg=="pl_PL"?"تحرير الأسئلة":"Edit Questions"}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={12} sm={8} lg={8} xl={8} md={8}>
                <Box className={"Input_box"}>
                  <InputLable text={listlegveg=="pl_PL"?"اسم":"Name"} fs={"12px"} />
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
                  <InputLable text={listlegveg=="pl_PL"?"فئة":"Category"} fs={"12px"} />

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
                    <MenuItem value={"select_category"}>
                    {listlegveg=="pl_PL"?"اختر الفئة":"Select Category"}
                    </MenuItem>
                    {categoryList.map((option) => (
                      <MenuItem key={option.value} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box className={"error_text_view"}>
                    {selectedOption == "selectedOption" && (
                      <Input_error text={listlegveg=="pl_PL"?"اختر تصنيف":"Select a category"} />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <div className={styles.cesalbtncss}>
              <Button_ handleClick={handleCloseEdit} text={listlegveg=="pl_PL"?"يلغي":"Cancel"} />
              <Button_ type={"submit"} text={listlegveg=="pl_PL"?"يضيف":"Add"} />{" "}
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
        {listlegveg=="pl_PL"?"حذف الأسئلة":
          "Delete Questions"}
        </DialogTitle>
        <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
          <Typography>{listlegveg=="pl_PL"?"هل أنت متأكد أنك تريد حذف الأسئلة؟":"Are you sure you want to delete Questions?"}</Typography>
          <div className={styles.cesalbtncss}>
            <Button_ handleClick={handleClose_delete} text={listlegveg=="pl_PL"?"يلغي":"Cancel"} />
            <Button_ handleClick={onDelete} text={listlegveg=="pl_PL"?"يمسح":"Delete"} />{" "}
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
              placeholder={listlegveg=='pl_PL'?"يبحث":"search"}
              className={styles.searchbtn}
              autoComplete="off"
              onChange={(e) => {
                onSearch(e);
              }}
            />
          </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={9}>
          <Button
            className={styles.megobtn}
            onClick={() => {
              // getCategoryList();
              handleClickOpen();
            }}
          >
          {listlegveg=="pl_PL"?"أضف أسئلة":
            "Add Questions"}
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
          {listlegveg=="pl_PL"?"أضف أسئلة":
            "Add Questions"}
          </DialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} sm={8} lg={8} xl={8} md={8}>
                  <Box className={"Input_box"}>
                    <InputLable text={listlegveg=="pl_PL"?"اسم":"Name"} fs={"12px"} />
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
                    <InputLable text={listlegveg=="pl_PL"?"فئة":"Category"} fs={"12px"} />

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
                      <MenuItem value={"select_category"}>
                        {listlegveg=="pl_PL"?"اختر الفئة":"Select Category"}
                      </MenuItem>

                      {categoryList.map((option) => (
                        <MenuItem key={option.value} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Box className={"error_text_view"}>
                      {submitted && selectedOption == "select_category" ? (
                        <Input_error text={listlegveg=="pl_PL"?"اختر تصنيف":"Select a category"} />
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <div className={styles.cesalbtncss}>
                <Button_ handleClick={handleClose} text={listlegveg=="pl_PL"?"يلغي":"Cancel"} />
                <Button_ type={"submit"} text={listlegveg=="pl_PL"?"يضيف":"Add"} />{" "}
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
                <TableContainer
                  style={{ overflowX: "auto", borderRadius: "0px" }}
                >
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
                          <TableRow
                            key={index}
                            style={{
                              height: "50px",
                              borderBottom: "1px solid rgba(224, 224, 224, 1)",
                            }}
                          >
                            <TableCell className={Style.table_cell}>
                              {item.name}
                            </TableCell>
                            <TableCell className={Style.table_cell}>
                              {item.category_name}
                            </TableCell>
                            <TableCell
                              className={[Style.table_cell, "content_end"]}
                            >
                              <Box style={{ display: "flex" }}>
                                <IconButton
                                  className="icon_btn"
                                  onClick={() => {
                                    // onViewCategory({ id_user: item.id });
                                    handleClickOpenEdit({ id_user: item.id });
                                    setQuestionDetails(item);
                                  }}
                                >
                                  <Editicon height={15} width={15} />
                                </IconButton>
                                <IconButton
                                  className="icon_btn"
                                  onClick={() => {
                                    handleOpen_delete();
                                    setQuestionDetails(item);
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
