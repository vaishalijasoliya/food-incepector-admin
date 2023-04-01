import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { addDays } from 'date-fns';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from '../../styles/user/paymenttable.module.css';
import { useRouter } from 'next/router';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Paper from '@mui/material/Paper';
import { Types } from '../../constants/actionTypes';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import moment from 'moment'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const style = { width: 260, display: 'block', marginBottom: 10 };

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
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
  return order === 'desc'
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

const EnhancedTable = (props) => {

  const router = useRouter();

  // console.log(props, 'mirav');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [resetBtnClicked, setresetBtnClicked] = React.useState(false);


  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [paymentlist, setPaymentlist] = React.useState([]);
  const [payment, setPayment] = React.useState([]);
  const [customer, setCustomer] = React.useState([]);
  const [dateEnd, setDateEnd] = React.useState("");
  const [saesData, setSaesData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);

  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [fullWidth, setFullWidth] = React.useState(true);

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
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
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);



  const isSelected = (name) => customer.indexOf(name) !== -1;
  console.log(saesData, 'saesData');
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
      "x-access-token": props.props.profile.token
    }
    console.log(startDate, endDate, "startDate");

    // endDate=="" ? "virang":"mirav"
    var body = {};
    if (!!startDate && !!endDate) {
      body.start_day = moment(startDate).format("MM/DD/YYYY")
      body.end_day = moment(endDate).format("MM/DD/YYYY")
    }
    props.props.loaderRef(true)
    const data = await ApiServices.PostApiCall(ApiEndpoint.USER_PAYMENT_LIST, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    // console.log(data, "DATA")
    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        console.log(data.data, 'dataa');
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
            User: element.profile_photo
          }
          inactiveData.push(object)
        }
        setPayment(inactiveData)
        setPaymentlist(inactiveData)
        // setActiveuser('inactive')
      } else {
        setPayment([])
        setPaymentlist([])
      }
    }
  }
  // console.log(payment, "paymentlist");
  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      getInActiveUserList()
      // usercountlist()
      // getactiveUserListdate()
      // getonlineUserListdate()
      // getinactiveUserListdate()
    }
  }, [])




  return (
    <Grid container>
      <Grid container display={'flex'} className={styles.hadpeg}>
        <Grid className={styles.inputbox} item xs={12} md={3}  >
          <Box className={styles.boxreting} display={'flex'}>

            <input type="text" id='myserchbtn' name="search" placeholder="Search" className={styles.searchbtn} autoComplete="off"
              value={saesData}

              onChange={(e) => {
                setPage(0)
                var value = e.target.value
                setSaesData(e.target.value)
                //  onChange={(e) => setText(e.target.value)}
                if (typeof value !== 'object') {
                  if (!value || value == '') {
                    setPayment(paymentlist);
                  } else {
                    var filteredData = paymentlist.filter((item) => {
                      let searchValue = item.Name.toLowerCase();
                      return searchValue.includes(value.toString().toLowerCase())
                    })
                    setPayment(filteredData);
                  }
                }
              }} />
            {/* { console.log( value,'paymentlist')} */}

          </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={9}>
          <Button className={styles.megobtn} onClick={handleClickOpen}>
            Add Incepector
          </Button>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle className={styles.addtitalaja}>Add Questions</DialogTitle>
            <DialogContent>
            <p className={styles.lebalpereea}>Enter Name</p>
            <Select
              className={styles.addlistselect}
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                // label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>

              <p className={styles.lebalpereea}>Enter Name</p>
              <TextField id="outlined-basic" placeholder="Enter Name" className={styles.addnumbarinput} variant="outlined" />
         
              <div className={styles.cesalbtncss}>
                <Button className={styles.ceselbtfffaa} onClick={handleClose}>Cancel</Button>
                <Button className={styles.adddatalist}>Add</Button>
              </div>
            </DialogContent>

          </Dialog>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openTWO}
            onClose={handleCloseTWO}
          >
            <DialogTitle className={styles.addtitalaja}>Edit Catergory</DialogTitle>
            <DialogContent>
              <p className={styles.lebalpereea}>Enter Name</p>
              <TextField id="outlined-basic" placeholder="Enter Name" className={styles.addnumbarinput} variant="outlined" />
            
              <div className={styles.cesalbtncss}>
                <Button className={styles.ceselbtfffaa} onClick={handleCloseTWO}>Cancel</Button>
                <Button className={styles.adddatalist}>Edit</Button>
              </div>
            </DialogContent>

          </Dialog>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={12}  >
          <div >
            <Box sx={{ width: '100%' }} >
              <Paper sx={{ width: '100%', mb: 2 }} className={styles.maentebal2} >
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                  >   <TableHead>
                      <TableRow>
                        <TableCell align="left" className={styles.addnmejdhd}>Category</TableCell>
                        <TableCell align="left" className={styles.addnmejdhd}>Questions</TableCell>
                        <TableCell align="right" className={styles.hediangada}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stableSort(payment, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.name);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                            >


                              <TableCell className={styles.addnmejdhd2}>{row.Email}</TableCell>
                              <TableCell className={styles.addnmejdhd2}>{row.Email}</TableCell>
                              <TableCell className={styles.datatrgaffa}>                 <Button className={styles.editbtntebal} onClick={handleClickOpenTWO}><ModeEditIcon style={{ fontSize: '17px' }} /></Button>

                                <Button className={styles.editbtntebal2}><DeleteOutlineIcon style={{ fontSize: '17px', color: '#E31E24' }} /></Button></TableCell>
                            </TableRow>
                          );
                        })}

                      {/* {emptyRows > 0 && ( */}
                      <TableRow>
                      </TableRow>
                      {/* )} */}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[7, 10, 25, 100]}
                  component="div"
                  className={styles.bakgvcal}
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
}
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

const calenderIcon = () => {
  return (
    <img src="./image/calender.png" className="calenderimg" />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);