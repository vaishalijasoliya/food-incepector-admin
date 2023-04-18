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

//forlocation field autociomplate***********
// import Autocomplete from "@mui/material/Autocomplete";
// const top100Films = [
//   { label: "The Shawshank Redemption", year: 1994 },
//   { label: "The Godfather", year: 1972 },
//   { label: "The Godfather: Part II", year: 1974 },
//   { label: "The Dark Knight", year: 2008 },
//   { label: "12 Angry Men", year: 1957 },
//   { label: "Schindler's List", year: 1993 },
//   { label: "Pulp Fiction", year: 1994 },
//   {
//     label: "The Lord of the Rings: The Return of the King",
//     year: 2003,
//   },
//   { label: "The Good, the Bad and the Ugly", year: 1966 },
//   { label: "Fight Club", year: 1999 },
//   {
//     label: "The Lord of the Rings: The Fellowship of the Ring",
//     year: 2001,
//   },
//   {
//     label: "Star Wars: Episode V - The Empire Strikes Back",
//     year: 1980,
//   },
//   { label: "Forrest Gump", year: 1994 },
//   { label: "Inception", year: 2010 },
//   {
//     label: "The Lord of the Rings: The Two Towers",
//     year: 2002,
//   },
//   { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { label: "Goodfellas", year: 1990 },
//   { label: "The Matrix", year: 1999 },
//   { label: "Seven Samurai", year: 1954 },
//   {
//     label: "Star Wars: Episode IV - A New Hope",
//     year: 1977,
//   },
//   { label: "City of God", year: 2002 },
//   { label: "Se7en", year: 1995 },
//   { label: "The Silence of the Lambs", year: 1991 },
//   { label: "It's a Wonderful Life", year: 1946 },
//   { label: "Life Is Beautiful", year: 1997 },
//   { label: "The Usual Suspects", year: 1995 },
//   { label: "Léon: The Professional", year: 1994 },
//   { label: "Spirited Away", year: 2001 },
//   { label: "Saving Private Ryan", year: 1998 },
//   { label: "Once Upon a Time in the West", year: 1968 },
//   { label: "American History X", year: 1998 },
//   { label: "Interstellar", year: 2014 },
//   { label: "Casablanca", year: 1942 },
//   { label: "City Lights", year: 1931 },
//   { label: "Psycho", year: 1960 },
//   { label: "The Green Mile", year: 1999 },
//   { label: "The Intouchables", year: 2011 },
//   { label: "Modern Times", year: 1936 },
//   { label: "Raiders of the Lost Ark", year: 1981 },
//   { label: "Rear Window", year: 1954 },
//   { label: "The Pianist", year: 2002 },
//   { label: "The Departed", year: 2006 },
//   { label: "Terminator 2: Judgment Day", year: 1991 },
//   { label: "Back to the Future", year: 1985 },
//   { label: "Whiplash", year: 2014 },
//   { label: "Gladiator", year: 2000 },
//   { label: "Memento", year: 2000 },
//   { label: "The Prestige", year: 2006 },
//   { label: "The Lion King", year: 1994 },
//   { label: "Apocalypse Now", year: 1979 },
//   { label: "Alien", year: 1979 },
//   { label: "Sunset Boulevard", year: 1950 },
//   {
//     label:
//       "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
//     year: 1964,
//   },
//   { label: "The Great Dictator", year: 1940 },
//   { label: "Cinema Paradiso", year: 1988 },
//   { label: "The Lives of Others", year: 2006 },
//   { label: "Grave of the Fireflies", year: 1988 },
//   { label: "Paths of Glory", year: 1957 },
//   { label: "Django Unchained", year: 2012 },
//   { label: "The Shining", year: 1980 },
//   { label: "WALL·E", year: 2008 },
//   { label: "American Beauty", year: 1999 },
//   { label: "The Dark Knight Rises", year: 2012 },
//   { label: "Princess Mononoke", year: 1997 },
//   { label: "Aliens", year: 1986 },
//   { label: "Oldboy", year: 2003 },
//   { label: "Once Upon a Time in America", year: 1984 },
//   { label: "Witness for the Prosecution", year: 1957 },
//   { label: "Das Boot", year: 1981 },
//   { label: "Citizen Kane", year: 1941 },
//   { label: "North by Northwest", year: 1959 },
//   { label: "Vertigo", year: 1958 },
//   {
//     label: "Star Wars: Episode VI - Return of the Jedi",
//     year: 1983,
//   },
//   { label: "Reservoir Dogs", year: 1992 },
//   { label: "Braveheart", year: 1995 },
//   { label: "M", year: 1931 },
//   { label: "Requiem for a Dream", year: 2000 },
//   { label: "Amélie", year: 2001 },
//   { label: "A Clockwork Orange", year: 1971 },
//   { label: "Like Stars on Earth", year: 2007 },
//   { label: "Taxi Driver", year: 1976 },
//   { label: "Lawrence of Arabia", year: 1962 },
//   { label: "Double Indemnity", year: 1944 },
//   {
//     label: "Eternal Sunshine of the Spotless Mind",
//     year: 2004,
//   },
//   { label: "Amadeus", year: 1984 },
//   { label: "To Kill a Mockingbird", year: 1962 },
//   { label: "Toy Story 3", year: 2010 },
//   { label: "Logan", year: 2017 },
//   { label: "Full Metal Jacket", year: 1987 },
//   { label: "Dangal", year: 2016 },
//   { label: "The Sting", year: 1973 },
//   { label: "2001: A Space Odyssey", year: 1968 },
//   { label: "Singin' in the Rain", year: 1952 },
//   { label: "Toy Story", year: 1995 },
//   { label: "Bicycle Thieves", year: 1948 },
//   { label: "The Kid", year: 1921 },
//   { label: "Inglourious Basterds", year: 2009 },
//   { label: "Snatch", year: 2000 },
//   { label: "3 Idiots", year: 2009 },
//   { label: "Monty Python and the Holy Grail", year: 1975 },
// ];

//for catogory field***********
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import ListSubheader from "@mui/material/ListSubheader";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";


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
                {/* <InputField
                  name={"size"}
                  lable={"Size"}
                  error={formik.errors}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  inputProps={inputPropssize}
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
                {/* <Table_Pagination
                  rowsPerPageOptions={[7, 10, 25, 100]}
                  dataCount={payment.length}
                  rowsPerPage={rowsPerPage}
                  Page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
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
