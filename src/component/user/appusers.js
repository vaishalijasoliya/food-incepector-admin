import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import styles from "../../styles/user/paymenttable.module.css";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Avatar from "@mui/material/Avatar";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";
import { toast } from "react-toastify";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button_ } from "../../Layout/buttons";
import MainStyles from "../../styles/mainstyles.module.css";
import { InputLable } from "../../Layout/inputlable";
import { TextField } from "@mui/material";
import { auditorData } from "../Utils/data";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const headCells = [
  {
    id: "Phone",
    disablePadding: false,
    label: "Phone",
  },

  {
    id: "Action",
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.All}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.All ? order : false}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { numSelected, status } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          className={styles.hedingtbl}
        >
          Incepector List
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
const EnhancedTable = (props) => {
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
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };

  const handleCloseTWO = () => {
    setOpenTWO(false);
  };

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    if (!!props.profile && !!props.profile.token) {
      setCustomerList(props.userList);
      setCustomer(props.userList);
    }
  }, [props.userList]);
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            key={1}
          >
            <DialogTitle className={styles.addtitalaja}>
              Add Incepector
            </DialogTitle>
            <DialogContent>
              <Box className={"Input_box"}>
                <InputLable text={"Number"} />
                <TextField
                  placeholder="Enter Number"
                  className={MainStyles.Input_field}
                  variant="outlined"
                />
              </Box>
              <Box className={"Input_box"}>
                <InputLable text={"Password"} />
                <TextField
                  className={MainStyles.Input_field}
                  placeholder="Enter Password"
                  variant="outlined"
                />
                {/* <Box className={Styles.error_text_view}>
                  {formik.errors.userName && formik.touched.userName && (
                    <Input_error text={formik.errors.userName} />
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
                        <TableCell align="left" className={styles.addnmejdhd}>
                          Phone
                        </TableCell>
                        <TableCell align="right" className={styles.hediangada}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody></TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[7, 10, 25, 100]}
                  component="div"
                  className={styles.bakgvcal}
                  count={customer.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {/* <TablePagination
                  className={styles.bakgvcal}
                  rowsPerPageOptions={[7, 10, 25, 50, 75]}
                  component="div"
                  count={customer.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
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

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
