import * as React from "react";
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
} from "@mui/material";
import styles from "../../styles/user/paymenttable.module.css";
import { useRouter } from "next/router";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import moment from "moment";
import { Table_Pagination } from "../../Layout/Pagination/pagination";
import { Button_ } from "../../Layout/buttons";
import { InputLable } from "../../Layout/inputlable";
import { InputField } from "../../Layout/input";
import { useFormik } from "formik";
import * as Yup from "yup";

const inputProps = {
  min: 0,
  max: 10,
};

//for size*****
const inputPropssize = {
  min: 0,
  max: 10,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Hotels_list = (props) => {
  const router = useRouter();
  // console.log(props, 'mirav');
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [paymentlist, setPaymentlist] = React.useState([]);
  const [payment, setPayment] = React.useState([]);
  const [customer, setCustomer] = React.useState([]);
  const [saesData, setSaesData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };

  const handleCloseTWO = () => {
    setOpenTWO(false);
  };
  const isSelected = (name) => customer.indexOf(name) !== -1;
  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getInActiveUserList = async (startDate, endDate) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {};
    if (!!startDate && !!endDate) {
      body.start_day = moment(startDate).format("MM/DD/YYYY");
      body.end_day = moment(endDate).format("MM/DD/YYYY");
    }
    props.props.loaderRef(true);
    const data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_PAYMENT_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    // console.log(data, "DATA")
    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        console.log(data.data, "dataa");
        const inactiveData = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          const object = {
            id: element.id,
            All: element.payment,
            Email: element.email,
            Gender: element.gender,
            Name: element.full_name,
            Phone: element.phone_number,
            User: element.profile_photo,
          };
          inactiveData.push(object);
        }
        setPayment(inactiveData);
        setPaymentlist(inactiveData);
        // setActiveuser('inactive')
      } else {
        setPayment([]);
        setPaymentlist([]);
      }
    }
  };
  // console.log(payment, "paymentlist");
  //   React.useEffect(() => {
  //     if (!!props.props.profile && !!props.props.profile.token) {
  //       getInActiveUserList();
  //     }
  //   }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNo: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
      email: Yup.string()
        .required("Email Adderess is required.")
        .email("Enter Valid Email"),
      mobileNo: Yup.string().required("Mobile number is required."),
    }),
    onSubmit: () => {
      const userData = {
        userId: user.id,
        name: formik.values.userName,
      };
      dispatchStore(userActions.userProfileupdate_(userData, nextpage));
    },
  });

  return (
    <Grid container>
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
                    setPayment(paymentlist);
                  } else {
                    var filteredData = paymentlist.filter((item) => {
                      let searchValue = item.Name.toLowerCase();
                      return searchValue.includes(
                        value.toString().toLowerCase()
                      );
                    });
                    setPayment(filteredData);
                  }
                }
              }}
            />
          </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={9}>
          <Button className={styles.megobtn} onClick={handleClickOpen}>
            Add hotel
          </Button>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle className={styles.addtitalaja}>Add hotel</DialogTitle>
            <DialogContent>
              <Box className={"Input_box"}>
                <InputField
                  name={"name"}
                  placeholder={"Enter Name"}
                  lable={"Name"}
                  className={styles.inputfield}
                  error={formik.errors}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputField
                  name={"supervisor"}
                  placeholder={"Enter supervisor Name"}
                  lable={"supervisor"}
                  error={formik.errors}
                  className={styles.inputfield}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputField
                  name={"Head of staff"}
                  type={"number"}
                  placeholder={"Enter Head of Staff Name"}
                  lable={"Head of staff"}
                  error={formik.errors}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputField
                  name={"location"}
                  placeholder={"Enter your location"}
                  lable={"Add a location"}
                  error={formik.errors}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputField
                  name={"catagory"}
                  placeholder={"catagory"}
                  lable={"catagory"}
                  error={formik.errors}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* <InputField
                  name={"Timing"}
                  placeholder={"00:00:00"}
                  lable={"Timing"}
                  error={formik.errors}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />  */}

                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  // sx={{ width: 300 }}
                  className={styles.autocomplete_styles}
                  placeholder={"Add a location"}
                  renderInput={(params) => (
                    <TextField {...params}  label="Add a location" />
                  )}
                /> */}

                {/* <FormControl
                  className={styles.catagory_style}
                  sx={{ m: 1, minWidth: 120, margin: 0}}
                >
                  <InputLabel  className={styles.catagory_input_lable} htmlFor="grouped-native-select">
                    Catagory
                  </InputLabel>
                  <Select
                    native
                    defaultValue=""
                    id="grouped-native-select"
                    label="Catagory"
                  >
                    <option aria-label="None" value="" />
                    <optgroup label="Category 1">
                      <option value={1}>Option 1</option>
                      <option value={2}>Option 2</option>
                    </optgroup>
                    <optgroup label="Category 2">
                      <option value={3}>Option 3</option>
                      <option value={4}>Option 4</option>
                    </optgroup>
                  </Select>
                </FormControl> */}

                <div className={styles.time_and_size_div}>
                  {/* //for timing************* */}
                  <TextField
                    id="time"
                    className={styles.time_style}
                    placeholder={"set Time"}
                    type="time"
                    inputProps={inputProps}
                  />

                  {/* //for size*** */}
                  <TextField
                    placeholder={"Size"}
                    className={styles.size_style}
                    type="number"
                    inputProps={inputPropssize}
                  />
                </div>

                {/* <Box className={styles.error_text_view}>
                  {formik.errors.name && formik.touched.name && (
                    <Input_error text={formik.errors.name} />
                  )}
                </Box> */}
              </Box>
              <div className={styles.cesalbtncss}>
                <Button_ handleClick={handleClose} text={"Cancle"} />
                <Button_ handleClick={handleClose} text={"Add"} />
              </div>
            </DialogContent>
          </Dialog>
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={openTWO}
            onClose={handleCloseTWO}
          >
            <DialogTitle className={styles.addtitalaja}>
              Edit Catergory
            </DialogTitle>
            <DialogContent>
              <p className={styles.lebalpereea}>Enter Name</p>
              <TextField
                id="outlined-basic"
                placeholder="Enter Name"
                className={styles.addnumbarinput}
                variant="outlined"
              />

              <div className={styles.cesalbtncss}>
                <Button
                  className={styles.ceselbtfffaa}
                  onClick={handleCloseTWO}
                >
                  Cancel
                </Button>
                <Button className={styles.adddatalist}>Edit</Button>
              </div>
            </DialogContent>
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
                    {" "}
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" className={styles.addnmejdhd}>
                          Name
                        </TableCell>
                        <TableCell align="right" className={styles.hediangada}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stableSort(payment, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className={styles.addnmejdhd2}>
                                {row.Email}
                              </TableCell>
                              <TableCell className={styles.datatrgaffa}>
                                {" "}
                                <Button
                                  className={styles.editbtntebal}
                                  onClick={handleClickOpenTWO}
                                >
                                  <ModeEditIcon style={{ fontSize: "17px" }} />
                                </Button>
                                <Button className={styles.editbtntebal2}>
                                  <DeleteOutlineIcon
                                    style={{
                                      fontSize: "17px",
                                      color: "#E31E24",
                                    }}
                                  />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}

                      {/* {emptyRows > 0 && ( */}
                      <TableRow></TableRow>
                      {/* )} */}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[7, 10, 25, 100]}
                  component="div"
                  className={"Pagination__style"}
                  count={payment.length}
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

export default connect(mapStateToProps, mapDispatchToProps)(Hotels_list);
