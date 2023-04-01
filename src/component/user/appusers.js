import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import styles from '../../styles/user/paymenttable.module.css';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Types } from '../../constants/actionTypes';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { toast } from 'react-toastify';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';

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
function createData(User, Name, Email, Phone, Gender, All) {
  return {
    User, Name, Email, Phone, Gender, All
  };
}





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
const headCells = [

  {
    id: 'Phone',
    disablePadding: false,
    label: 'Phone',
  },

  {
    id: 'Action',
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.All}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.All ? order : false}
          >

            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, status } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
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
  const grey = {
    400: '#BFC7CF',
    500: '#AAB4BE',
    600: '#6F7E8C',
  };
  const blue = {
    500: '#36DAB2',
  };

  // console.log(props, 'mirav');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [signupList, setSignupList] = React.useState([]);
  const [onlineList, setOnlineList] = React.useState([]);
  const [inactiveList, setInactiveList] = React.useState([]);
  const [customer, setCustomer] = React.useState([]);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [customerList, setCustomerList] = React.useState([]);
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [tableData, setTableData] = React.useState([]);
  const isSelected = (name) => customer.indexOf(name) !== -1;
  const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };
  const [checked, setChecked] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [openTWO, setOpenTWO] = React.useState(false);

  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [fullWidth, setFullWidth] = React.useState(true);
const[editdata,setEditdata]=React.useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };
console.log(editdata,'editdata');
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };

  const handleCloseTWO = () => {
    setOpenTWO(false);
  };



  const Root = styled('span')(
    ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${blue[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }`,
  )


  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleChange = (newValue) => {
    setStartDate(newValue);
  };

  React.useEffect(() => {
    console.log(props.userList, 'props.userList')
    if (!!props.profile && !!props.profile.token) {
      setCustomerList(props.userList);
      setCustomer(props.userList);

    }
  }, [props.userList])
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const userReActive = async (id) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    var body = { id_user: id }
    props.props.loaderRef(true)
    const data = await ApiServices.PostApiCall(ApiEndpoint.USER_REACTIVE, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    if (!!data) {
      if (data.status == true) {
        props.getInActiveUserList()
        props.getOnlineiUserList()
        props.getSingUpUserList()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } else {
      toast.error('Something went wrong.')
    }
  }

  const userCancel = async (id) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    var body = { id_user: id }
    props.props.loaderRef(true)
    const data = await ApiServices.PostApiCall(ApiEndpoint.USER_CANCEL, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    if (!!data) {
      if (data.status == true) {
        props.getInActiveUserList()
        props.getOnlineiUserList()
        props.getSingUpUserList()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } else {
      toast.error('Something went wrong.')
    }
  }

  return (
    <Grid container>
      <Grid container display={'flex'} className={styles.hadpeg}>
        <Grid className={styles.inputbox} item sm={12} md={3} xs={12} >
          <Box className={styles.boxreting} display={'flex'}>

            <input type="text" id='myserchbtn' name="search" placeholder="Search" className={styles.searchbtn} autoComplete="off" onChange={(e) => {
              setPage(0)
              var value = e.target.value
              if (typeof value !== 'object') {
                if (!value || value == '') {
                  setCustomer(customerList);
                } else {
                  var filteredData = customerList.filter((item) => {
                    let searchValue = item.Name.toLowerCase();
                    return searchValue.includes(value.toString().toLowerCase())
                  })
                  setCustomer(filteredData);
                }
              }
            }} />
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
          >
            <DialogTitle className={styles.addtitalaja}>Add Incepector</DialogTitle>
            <DialogContent>
              <p className={styles.lebalpereea}>Enter Number</p>
              <TextField id="outlined-basic" placeholder="Enter Number" className={styles.addnumbarinput} variant="outlined" />
              <p className={styles.lebalpereea}>Enter Password</p>
              <TextField id="outlined-basic" className={styles.addnumbarinput} placeholder="Enter Password" variant="outlined" />
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
            <DialogTitle className={styles.addtitalaja}>Edit Incepector</DialogTitle>
            <DialogContent>
              <p className={styles.lebalpereea}>Enter Number</p>
              <TextField id="outlined-basic" value={editdata} placeholder="Enter Number" className={styles.addnumbarinput} variant="outlined" />
              <p className={styles.lebalpereea}>Enter Password</p>
              <TextField id="outlined-basic"  className={styles.addnumbarinput} placeholder="Enter Password" variant="outlined" />
              <div className={styles.cesalbtncss}>
                <Button className={styles.ceselbtfffaa} onClick={handleCloseTWO}>Cancel</Button>
                <Button className={styles.adddatalist}>Edit</Button>
              </div>
            </DialogContent>

          </Dialog>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={12}>

          <div>
            <Box sx={{ width: '100%' }} >
              <Paper sx={{ width: '100%', mb: 2 }} className={styles.maentebal2} >
                <EnhancedTableToolbar status={props.status} numSelected={selected.length} />
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                  >
                     <TableHead>
                      <TableRow>
                        <TableCell align="left" className={styles.addnmejdhd}>Phone</TableCell>
                        <TableCell align="right" className={styles.hediangada}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stableSort(customer, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.name);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow>

                          
                              <TableCell className={styles.addnmejdhd2}>{row.Phone}</TableCell>
                            
                              <TableCell className={styles.datatrgaffa}>
                                <Button className={styles.editbtntebal} onClick={()=>{handleClickOpenTWO(),setEditdata(row.Phone)}}><ModeEditIcon style={{ fontSize: '17px' }} /></Button>
                                <Button className={styles.editbtntebal2}><DeleteOutlineIcon style={{ fontSize: '17px', color: '#E31E24' }} /></Button>
                              </TableCell>

                            </TableRow>
                          );
                        })}

                      {/* {emptyRows > 0 && ( */}
                      <TableRow >
                      </TableRow>
                    </TableBody>
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

