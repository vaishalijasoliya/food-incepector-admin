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
  Avatar,
} from "@mui/material";
import styles from "../../styles/user/paymenttable.module.css";
import { useRouter } from "next/router";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import { Button_ } from "../../Layout/buttons";
import { InputLable } from "../../Layout/inputlable";
import InputField from '@mui/material/Input';
import { useFormik } from "formik";
import * as Yup from "yup";


//for size*****
const inputPropssize = {
  min : 0,
  max : 10,
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
  const [saesData, setSaesData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);
  const [hotelsData_, setHotelData] = React.useState([]);
  const [hotelSearch, setHotelSearch] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleCloseTWO = () => {
    setOpenTWO(false);
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
      email: "",
      supervisor: "",
      category: "",
      hos: "",
      location: "",
      timing: "",
      size: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
      mobileNo: Yup.string().required("Mobile number is required."),
      supervisor: Yup.string().required("Superviser in required."),
      category: Yup.string().required("Category is required"),
      hos: Yup.string().required("Head of staff in required."),
      location: Yup.string().required("Location is required."),
      timing: Yup.string().required("Timing is required."),
      size: Yup.string().required("Size is required"),
    }),
    onSubmit: () => {
      const userData = {
        userId: user.id,
        name: formik.values.userName,
      };
      dispatchStore(userActions.userProfileupdate_(userData, nextpage));
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
  ];

  React.useEffect(() => {
    setHotelData(HotelsData);
    setHotelSearch(HotelsData);
  }, []);

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
            Add hotel
          </Button>
          <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={open}
            onClose={handleClose}
            key={1}
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
                  lable={"Supervisor"}
                  error={formik.errors}
                  className={styles.inputfield}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputField
                  name={"head of staff"}
                  type={"number"}
                  placeholder={"Enter Your Head of Staff Name"}
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
                  placeholder={"Catagory"}
                  lable={"Catagory"}
                  error={formik.errors}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /> 
                 <InputField
                  name={"Timing"}
                  placeholder={"00:00:00"}
                  lable={"Timing"}
                  error={formik.errors}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /> 
        

            

                {/* //for size*** */}
                <div  className={styles.size_style_div}>
                <TextField  placeholder={"Size"} className={styles.size_style} type="number" inputProps={inputPropssize} />
                </div>
                
                {/* <Box className={styles.error_text_view}>
                  {formik.errors.name && formik.touched.name && (
                    <Input_error text={formik.errors.name} />
                  )}
                </Box> */}
              </Box>
              <div className={styles.cesalbtncss}>
                <Button_ handleClick={handleClose} text={"Cancle"} />
                <Button_ handleClick={handleClose} text={"Add"} />{" "}
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
              Edit Category
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
                    <TableHead>
                      <TableRow>
                        {Header.map((item, index) => {
                          return (
                            <TableCell
                              key={index}
                              align="left"
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
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.company}</TableCell>
                            <TableCell>
                              {moment(item.timing).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>{item.head}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.size}</TableCell>
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

const calenderIcon = () => {
  return <img src="./image/calender.png" className="calenderimg" />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Hotels_list);
