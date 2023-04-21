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
import { HotelsData } from "../Utils/data";
import moment from "moment";
import { Input_error } from "../Utils/string";
import { DeleteIcon_, Editicon } from "../Utils/icons";
import { toast } from "react-toastify";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { Error_msg } from "../Utils/message";

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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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
    if (props && props.profile) {
      getLocationList();
      getAuditorList();
    }
  }, []);

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
      name: Yup.string().required("Name is required."),
      category: Yup.string().required("Category is required"),
      hos: Yup.string().required("Head of staff in required."),
      location: Yup.string().required("Location is required."),
      size: Yup.string().required("Size is required"),
    }),
    onSubmit: () => {
      setSubmitted(true);
      if (selectedOption != "select_category" && startTime && endTime) {
        if (open == true) {
          onAddLocation();
        } else if (openEdit == true) {
          onEditLocation();
        }
      }
    },
  });

  const Header = [
    {
      name: "Name",
      id: 1,
    },
    {
      name: "Company",
      id: 2,
    },
    {
      name: "Timing",
      id: 3,
    },
    {
      name: "Location",
      id: 4,
    },
    {
      name: "Head of staff",
      id: 5,
    },
    {
      name: "category",
      id: 6,
    },
    {
      name: "Size",
      id: 7,
    },
    {
      name: "Actions",
      id: 8,
    },
  ];

  const handleCloseEdit = () => {
    setOpenEdit(false);
    formik.resetForm();
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

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
      // mobileNo: formik.values.mobileNo,
      supervisor: formik.values.supervisor,
      category: formik.values.category,
      hos: formik.values.hos,
      location: formik.values.location,
      timing: formik.values.timing,
      size: formik.values.size,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.GetApiCall(
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

  function calculateTimeDiff(start, end) {
    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    const hours = Math.floor(diff / 3600);
    diff = diff - hours * 3600;
    const minutes = Math.floor(diff / 60);
    const seconds = diff - minutes * 60;
    setTimeDiff(`${hours} hours, ${minutes} minutes, ${seconds} seconds`);
  }

  return (
    <Grid container>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={deleteOpen}
        onClose={handleClose_delete}
      >
        <DialogTitle className={styles.addtitalaja}>
          Delete Locations
        </DialogTitle>
        <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
          <Typography>Are you sure you want to delete Location?</Typography>
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
          <Button className={styles.megobtn} onClick={handleClickOpen}>
            Add Location
          </Button>
          <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={open}
            onClose={handleClose}
            key={1}
          >
            <DialogTitle className={styles.addtitalaja}>
              Add Location
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
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
                      <InputLable text={"Auditor"} fs={"12px"} />
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
                          Select Auditor
                        </MenuItem>

                        {auditorList.map((option) => (
                          <MenuItem key={option.value} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <Box className={"error_text_view"}>
                        {submitted && selectedOption == "select_category" ? (
                          <Input_error text={"Select a category"} />
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={"Timing"} fs={"12px"} />
                      <div className={styles.timing_div}>
                        <div className={styles.time_input_box}>
                          <InputLable text={"Start :"} fs={"12px"} />
                          <input
                            type="time"
                            value={startTime}
                            onChange={handleStartTimeChange}
                          />
                        </div>
                        <div className={styles.time_input_box}>
                          <InputLable text={"End :"} fs={"12px"} />
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
                                      "End time should be after start time."
                                    }
                                  />
                                </div>
                              ) : (
                                ""
                              )
                            ) : (
                              <Input_error text={"Select Timing."} />
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
                      <InputLable text={"Size"} fs={"12px"} />
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
                      <InputLable text={"Location"} fs={"12px"} />
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
                  <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                    <Box className={"Input_box"}>
                      <InputLable text={"Head of staff"} fs={"12px"} />
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
                  <Button_ handleClick={handleClose} text={"Cancle"} />
                  <Button_ type={"submit"} text={"Add"} />{" "}
                </div>
              </Box>
            </form>
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
        <DialogTitle className={styles.addtitalaja}>Edit Location</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
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
                  <InputLable text={"Supervisor"} fs={"12px"} />
                  <TextField
                    className={"Input_field"}
                    name="supervisor"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.supervisor}
                  />
                  <Box className={"error_text_view"}>
                    {formik.errors.supervisor && formik.touched.supervisor && (
                      <Input_error text={formik.errors.supervisor} />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                <Box className={"Input_box"}>
                  <InputLable text={"Size"} fs={"12px"} />
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
                  <InputLable text={"Location"} fs={"12px"} />
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
              {/* </Box> */}
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
              <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                <Box className={"Input_box"}>
                  <InputLable text={"Head of staff"} fs={"12px"} />
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
              <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                <Box className={"Input_box"}>
                  <InputLable text={"Timing"} fs={"12px"} />
                  <TextField
                    className={"Input_field"}
                    name="timing"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.timing}
                  />
                  <Box className={"error_text_view"}>
                    {formik.errors.timing && formik.touched.timing && (
                      <Input_error text={formik.errors.timing} />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <div className={styles.cesalbtncss}>
              <Button_ handleClick={handleCloseEdit} text={"Cancle"} />
              <Button_ type={"submit"} text={"Edit"} />{" "}
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
                            <TableCell>{item.company}</TableCell>
                            <TableCell>{item.timing}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.head_staff}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.size}</TableCell>
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
                                  onClick={handleOpen_delete}
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
