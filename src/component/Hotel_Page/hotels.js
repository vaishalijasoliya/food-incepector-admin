import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Avatar,
  IconButton,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "../../styles/user/paymenttable.module.css";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import { Button_ } from "../../Layout/buttons";
import { InputLable } from "../../Layout/inputlable";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input_error } from "../Utils/string";
import { DeleteIcon_, Editicon } from "../Utils/icons";
import { toast } from "react-toastify";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { Error_msg } from "../Utils/message";

function convertTo24Hour(time) {
  let [hours, modifier] = time.split(" ");
  if (hours === "12" && modifier === "am") {
    hours = "00";
  } else if (hours !== "12" && modifier === "pm") {
    hours = parseInt(hours) + 12;
  }
  return hours;
}

const Hotels_list = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [saesData, setSaesData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [hotelsData_, setHotelData] = React.useState([]);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [hotelSearch, setHotelSearch] = React.useState([]);
  const [categoryDetails, setCategoryDetails] = React.useState("");
  const [userRender, setUserRender] = React.useState(true);
  const [selectedOption, setSelectedOption] = React.useState("select_category");
  const [auditorList, setAuditorList] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [startTime, setStartTime] = useState("9:00 pm");
  const [isOpen, setIsOpen] = useState("");
  const [endTime, setEndTime] = useState("");
  const [idLocation, setIdlocation] = React.useState("");
  const [listlegveg, setLegvg] = React.useState('')

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  // const [userRe]

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const isInvalidRange = () => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    return start >= end;
  };
  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const getLocationList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.LOCATION_LIST,
      null,
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        setHotelData(data.data);
        setHotelSearch(data.data);
      }
    }
    setUserRender(false);
  };

  React.useEffect(() => {
    if (props && props.profile && userRender) {
      getLocationList();
      getAuditorList();
      setUserRender(false);
    }
  }, [props, userRender]);

  const handleClose_delete = () => {
    setDeleteOpen(false);
  };

  const handleOpen_delete = () => {
    setDeleteOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const onViewCategory = async ({ id_user }) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_location: id_user,
    };

    // props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.VIEW_LOCATION,
      JSON.stringify(body),
      headers
    );
    // props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        formik.setFieldValue("name", data.data.name);
        formik.setFieldValue("category", data.data.category);
        formik.setFieldValue("hos", data.data.head_staff);
        formik.setFieldValue("location", data.data.location);
        formik.setFieldValue("size", data.data.size);
        setSelectedOption(data.data.id_auditor);
        const [startTimeString, endTimeString] = data.data.timing.split(" to ");
        const startTime24 = convertTo24Hour(startTimeString);
        const endTime24 = convertTo24Hour(endTimeString);
        const timeRangeString24 = `${startTime24}:00to${endTime24}:00`;
        const cuted = timeRangeString24.split("to");
        const checkNum = cuted[0].split(":");
        const isNum = parseFloat(checkNum);
        if (isNum >= 10) {
          setStartTime(cuted[0]);
        } else {
          setStartTime("0" + cuted[0]);
          console.log("0" + cuted[0], "is____cutted");
        }
        const checkNum_end = cuted[1].split(":");
        const isNum_end = parseFloat(checkNum_end);
        if (isNum_end >= 10) {
          setEndTime(cuted[1]);
        } else {
          setEndTime("0" + cuted[1]);
        }
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
  };
  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      hos: "",
      location: "",
      size: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(listlegveg=="pl_PL"?"مطلوب اسم.":"Name is required."),
      category: Yup.string().required(listlegveg=="pl_PL"?"اختيار القسم مطلوب":"Category is required"),
      hos: Yup.string().required(listlegveg=="pl_PL"?"مطلوب رئيس الموظفين.":"Head of staff in required."),
      location: Yup.string().required(listlegveg=="pl_PL"?"الموقع مطلوب.":"Location is required."),
      size: Yup.string().required(listlegveg=="pl_PL"?"الحجم مطلوب":"Size is required"),
    }),
    onSubmit: () => {
      setSubmitted(true);
      if (selectedOption != "select_category" && startTime && endTime) {
        if (isOpen == "Add") {
          onAddLocation();
        } else if (isOpen == "edit") {
          onEditLocation();
        }
      }
      formik.resetForm();
      setUserRender(false);
    },
  });
  const Header = [
    {
      name: listlegveg=="pl_PL"?"اسم":"Name",
      id: 1,
    },
    {
      name: listlegveg=="pl_PL"?"فئة":"category",
      id: 6,
    },
    {
      name: listlegveg=="pl_PL"?"مشرف":"supervisior",
      id: 7,
    },
    {
      name: listlegveg=="pl_PL"?"موقع":"Location",
      id: 4,
    },
    {
      name: listlegveg=="pl_PL"?"مقاس":"Size",
      id: 7,
    },
    {
      name: listlegveg=="pl_PL"?"توقيت":"Timing",
      id: 3,
    },
    {
      name: listlegveg=="pl_PL"?"رئيس فريق العمل":"Head of staff",
      id: 5,
    },
    {
      name: listlegveg=="pl_PL"?"أجراءات":"Actions",
      id: 8,
    },
  ];
  const onAddLocation = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };

    var body = {
      name: formik.values.name,
      id_auditor: selectedOption,
      location: formik.values.location,
      size: formik.values.size,
      timing: formatTime(startTime) + " " + "to" + " " + formatTime(endTime),
      category: formik.values.category,
      head_staff: formik.values.hos,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADD_LOCATION,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        toast.success(data.message);
        getLocationList();
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
    setSubmitted(false);
    setOpen(false);
  };
  const onEditLocation = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      name: formik.values.name,
      id_auditor: selectedOption,
      location: formik.values.location,
      size: formik.values.size,
      timing: formatTime(startTime) + " " + "to" + " " + formatTime(endTime),
      category: formik.values.category,
      head_staff: formik.values.hos,
      id_location: idLocation,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.EDIT_LOCATION,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    console.log(data, "is___________data");

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
  };
  const onDelete = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_location: idLocation,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.DELETE_LOCATION,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        toast.success(data.message);
        getLocationList();
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }

    handleClose_delete();
  };
  const getAuditorList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      type: "active",
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.AUDITOR_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        setAuditorList(data.data);
      }
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
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
          {listlegveg=="pl_PL"?"حذف المواقع":"Delete Locations"}
        </DialogTitle>
        <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
          <Typography>{listlegveg=="pl_PL"?"هل أنت متأكد أنك تريد حذف الموقع؟":"Are you sure you want to delete Location?"}</Typography>
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
              value={saesData}
              onChange={(e) => {
                setPage(0);
                var value = e.target.value;
                setSaesData(e.target.value);
                //  onChange={(e) => setText(e.target.value)}
                if (typeof value !== "object") {
                  if (!value || value == "") {
                    setHotelData(hotelSearch);
                  } else {
                    var filteredData = hotelSearch.filter((item) => {
                      let searchValue = item.name.toLowerCase();
                      return searchValue.includes(
                        value.toString().toLowerCase()
                      );
                    });
                    setHotelData(filteredData);
                  }
                }
              }}
            />
          </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={9}>
          <Button
            className={styles.megobtn}
            onClick={() => {
              handleClickOpen(), setIsOpen("Add");
            }}
          >
            {listlegveg=="pl_PL"?"أضف الموقع":"Add Location"}
          </Button>
          <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={open}
            onClose={handleClose}
            key={1}
          >
            <DialogTitle className={styles.addtitalaja}>
              {isOpen == "edit" ? "أضف الموقع" : "Add Location"}
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
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
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=="pl_PL"?"مدقق حسابات":"Auditor"} fs={"12px"} />
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
                          {listlegveg=="pl_PL"?"حدد المدقق":"Select Auditor"}
                        </MenuItem>

                        {auditorList.map((option) => (
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
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=="pl_PL"?"توقيت":"Timing"} fs={"12px"} />
                      <div className={styles.timing_div}>
                        <div className={styles.time_input_box}>
                          <InputLable text={listlegveg=="pl_PL"?"يبدأ :":"Start :"} fs={"12px"} />
                          <input
                            type="time"
                            value={startTime}
                            onChange={handleStartTimeChange}
                          />
                        </div>
                        <div className={styles.time_input_box}>
                          <InputLable text={listlegveg=="pl_PL"?"نهاية :":"End :"} fs={"12px"} />
                          <input
                            type="time"
                            value={endTime}
                            onChange={handleEndTimeChange}
                          />
                        </div>
                        <Box className={"error_text_view"}>
                          {submitted == true ? (
                            startTime && endTime ? (
                              isInvalidRange() ? (
                                <div style={{ color: "red" }}>
                                  <Input_error
                                    text={
                                      listlegveg=="pl_PL"?"يجب أن يكون وقت الانتهاء بعد وقت البدء.":"End time should be after start time."
                                    }
                                  />
                                </div>
                              ) : (
                                ""
                              )
                            ) : (
                              <Input_error text={listlegveg=="pl_PL"?"حدد التوقيت.":"Select Timing."} />
                            )
                          ) : (
                            ""
                          )}
                        </Box>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=="pl_PL"?"مقاس":"Size"} fs={"12px"} />
                      <TextField
                        className={"Input_field"}
                        name="size"
                        type="number"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.size}
                      />
                      <Box className={"error_text_view"}>
                        {formik.errors.size && formik.touched.size && (
                          <Input_error text={formik.errors.size} />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=="pl_PL"?"موقع":"Location"} fs={"12px"} />
                      <TextField
                        className={"Input_field"}
                        name="location"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.location}
                      />
                      <Box className={"error_text_view"}>
                        {formik.errors.location && formik.touched.location && (
                          <Input_error text={formik.errors.location} />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=="pl_PL"?"فئة":"Category"} fs={"12px"} />
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
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={listlegveg=="pl_PL"?"رئيس فريق العمل":"Head of staff"} fs={"12px"} />
                      <TextField
                        className={"Input_field"}
                        name="hos"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.hos}
                      />
                      <Box className={"error_text_view"}>
                        {formik.errors.hos && formik.touched.hos && (
                          <Input_error text={formik.errors.hos} />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <div className={styles.cesalbtncss}>
                  <Button_ handleClick={handleClose} text={listlegveg=="pl_PL"?"يلغي":"Cancel"} />
                  <Button_
                    type={"submit"}
                    text={isOpen == "edit" ? listlegveg=="pl_PL"?"يحرر":"Edit" : listlegveg=="pl_PL"?"يضيف":"Add"}
                  />{" "}
                </div>
              </Box>
            </form>
          </Dialog>
        </Grid>
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
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                  >
                    <TableHead>
                      <TableRow>
                        {Header.map((item, index) => {
                          return (
                            <TableCell
                              key={index}
                              style={{ textAlign: "left" }}
                              className={styles.addnmejdhd}
                            >
                              {item.name}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? hotelsData_.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : hotelsData_
                      ).map((item, index) => {
                        return (
                          <TableRow
                            style={{ borderBottom: "1px solid #DCDCDC" }}
                            key={index}
                          >
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.auditor_name}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.size}</TableCell>

                            <TableCell>{item.timing}</TableCell>
                            <TableCell>{item.head_staff}</TableCell>
                            <TableCell className="content_end">
                              <Box style={{ display: "flex" }}>
                                <IconButton
                                  className="icon_btn"
                                  onClick={() => {
                                    setIdlocation(item.id);
                                    onViewCategory({ id_user: item.id });
                                    handleClickOpen(), setIsOpen("edit");
                                  }}
                                >
                                  <Editicon height={15} width={15} />
                                </IconButton>
                                <IconButton
                                  className="icon_btn"
                                  onClick={() => {
                                    handleOpen_delete();
                                    setIdlocation(item.id);
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
                  className={"Pagination__style"}
                  count={hotelsData_.length}
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

export default connect(mapStateToProps, mapDispatchToProps)(Hotels_list);
