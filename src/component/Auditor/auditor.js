import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styles from "../../styles/user/paymenttable.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button_ } from "../../Layout/buttons";
import MainStyles from "../../styles/mainstyles.module.css";
import { InputLable } from "../../Layout/inputlable";
import { Dialog, IconButton, TextField } from "@mui/material";
import { auditorData } from "../Utils/data";
import Style from "./auditor.module.css";
import { DeleteIcon_, Editicon } from "../Utils/icons";
import { useFormik } from "formik";
import { InputField } from "../../Layout/input";
import * as Yup from "yup";
import { Input_error } from "../Utils/string";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const Auditor_page = (props) => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [customer, setCustomer] = React.useState([]);
  const [customerList, setCustomerList] = React.useState([]);
  const isSelected = (name) => customer.indexOf(name) !== -1;
  const label = { componentsProps: { input: { "aria-label": "Demo switch" } } };
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);

  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [editdata, setEditdata] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(editdata, "editdata");
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };

  const handleCloseTWO = () => {
    setOpenTWO(false);
  };
  const Header = [
    // { id: 1, name: "Index" },
    { id: 2, name: "Full name" },
    { id: 3, name: "company name" },
    { id: 4, name: "username" },
    { id: 5, name: "action" },
  ];

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    console.log(props.userList, "props.userList");
    if (!!props.profile && !!props.profile.token) {
      setCustomerList(props.userList);
      setCustomer(props.userList);
    }
  }, [props.userList]);
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
      userName: Yup.string().required("Username is required."),
      password: Yup.string().required("Password is required."),
      name: Yup.string().required("Name is required"),
      company: Yup.string().required("Company name is required"),
    }),
    onSubmit: () => {
      //   router.push("/dashboard");
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
              placeholder="Search"
              className={styles.searchbtn}
              autoComplete="off"
              onChange={(e) => {
                setPage(0);
                var value = e.target.value;
                if (typeof value !== "object") {
                  if (!value || value == "") {
                    setCustomer(customerList);
                  } else {
                    var filteredData = customerList.filter((item) => {
                      let searchValue = item.Name.toLowerCase();
                      return searchValue.includes(
                        value.toString().toLowerCase()
                      );
                    });
                    setCustomer(filteredData);
                  }
                }
              }}
            />
          </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={9} sm={12}>
          <Button className={styles.megobtn} onClick={handleClickOpen}>
            Add Incepector
          </Button>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={"md"}
            open={open}
            onClose={handleClose}
            key={1}
          >
            <DialogTitle className={styles.addtitalaja}>
              Add Incepector
            </DialogTitle>
            <DialogContent>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                  <Box className={"Input_box"}>
                    <InputLable text={"Enter name"} fs={"12px"} />
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
                    <InputLable text={"Company name"} fs={"12px"} />
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
                    <InputLable text={"Company name"} fs={"12px"} />
                    <TextField
                      className={"Input_field"}
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.userName}
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
                    <InputLable text={"Company name"} fs={"12px"} />
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
                    <InputLable text={"Enter name"} fs={"12px"} />
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
                    <InputLable text={"Enter name"} fs={"12px"} />
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
                <Button_ handleClick={handleClose} text={"Cancle"} />
                <Button_ handleClick={handleClose} text={"Add"} />{" "}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openTWO}
            onClose={handleCloseTWO}
          >
            <DialogTitle className={styles.addtitalaja}>
              Edit Incepector
            </DialogTitle>
            <DialogContent>
              <p className={styles.lebalpereea}>Enter Number</p>
              <TextField
                id="outlined-basic"
                value={editdata}
                placeholder="Enter Number"
                className={styles.addnumbarinput}
                variant="outlined"
              />
              <p className={styles.lebalpereea}>Enter Password</p>
              <TextField
                id="outlined-basic"
                className={styles.addnumbarinput}
                placeholder="Enter Password"
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
                    size={dense ? "small" : "medium"}
                  >
                    <TableHead>
                      <TableRow>
                        {Header.map((item, index) => {
                          return (
                            <TableCell
                              key={item.id}
                              //   align="left"
                              className={Style.table_cell}
                            >
                              {item.name}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? auditorData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : auditorData
                      ).map((item, index) => {
                        return (
                          <TableRow className={Style.table_row}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.company}</TableCell>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell>
                              <Box className={Style.last_td}>
                                <IconButton className={Style.icon_btn}>
                                  <DeleteIcon_ height={15} width={15} />
                                </IconButton>
                                <IconButton className={Style.icon_btn}>
                                  <Editicon height={15} width={15} />
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
                  count={auditorData.length}
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

export default connect(mapStateToProps, mapDispatchToProps)(Auditor_page);
