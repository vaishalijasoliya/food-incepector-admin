import React, { useState } from "react";
import styles from '../../styles/promotion/promotionlist.module.css';
import Grid from '@mui/material/Grid';
import { Box, Link } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import SwitchUnstyled from '@mui/material/Switch';
import Popuptabal from './popuptabal';
import InputAdornment from '@mui/material/InputAdornment';
import Popupform from './popupform';
import Ratingbox from './ratingbox';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import moment from 'moment';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from 'rsuite';
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink, CSVDownload } from "react-csv";
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
// import moment from 'moment'
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ width: '700', m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{

                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
const blue = {
    500: '#36DAB2',
};

const grey = {
    400: '#BFC7CF',
    500: '#AAB4BE',
    600: '#6F7E8C',
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
                                }
                                `,
)

const btnthem = createTheme({
    palette: {
        primary: {
            main: '#FF4B55'
        },
    },
});

const tabtheme = createTheme({
    palette: {
        primary: {
            main: '#32908F'
        },
    },
});


const DataGridDemo = (props) => {

    const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };
    const [com, setCom] = React.useState(false);
    const [advId, setAdvid] = React.useState("")
    const [advertiseMent, setAdvertisement] = React.useState("")
    const [image, setImage] = React.useState("")
    const [myData, setMyData] = React.useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const openlightbox = (index) => {
        console.log(index);
        setCurrentIndex(index);
        setopen(true);
    };
    var handleClickOpenCom = (myprops) => {
        setCom(true);
        // console.log(advertiseMent, startDate, endDate, image, 'hello data')
        myprops = { advertiseMent }
    };
    const handleCloseCom = () => {
        setCom(false);
    };
    const [open, setOpen] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [value, setValue] = React.useState('1');
    const [customerList, setCustomerList] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState(0);
    const [userSearch, setUserSearch] = React.useState([])
    const isSelected = (name) => rows.indexOf(name) !== -1;
    const [rowsPerPage, setRowsPerPage] = React.useState(7);

    const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handlepopClose = () => {
        onClose(selectedValue);
    };

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ width: '700', m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{

                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [myFunction, setMyfunction] = React.useState([])
    const [checked, setChecked] = React.useState(true);
    const [switchCheck, setSwitchcheck] = React.useState(false)
    const [idItem, setIdItem] = React.useState([])
    const [rows, setRows] = React.useState([]);
    const [videolist, setvideolist] = React.useState([]);
    const [imagelist, setimagelist] = React.useState([]);
    const [dateStart, setDateStart] = React.useState("");
    const [dateEnd, setDateEnd] = React.useState("");
    // const [startDate, setStartDate] = React.useState("");
    // const [endDate, setEndDate] = React.useState("");
    const [imgteg, setImageteg] = React.useState("");
    const [videoteg, setvideoteg] = React.useState("");
    const [userStatus, setUserStatus] = React.useState("all");
    const [userList, setUserList] = React.useState([])
    const [csvlist, setCsvlist] = React.useState([]);
    const handleChangePage = (event = unknown, newPage = number) => {
        setPage(newPage);
    };
    const getSingUpUserList = async (startDate, endDate) => {
        console.log(props, "virang2")
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = { type: 'all' }
        if (!!startDate && !!endDate) {
            body.start_day = moment(startDate).format("MM/DD/YYYY")
            body.end_day = moment(endDate).format("MM/DD/YYYY")
        }
        console.log(body, "body");
        props.props.loaderRef(true)
        const data = await ApiServices.PostApiCall(ApiEndpoint.PROMOTION_LIST, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        // console.log(data, "mirav");
        if (!!data) {
            if (data.status == true && data.data.length > 0) {
                const activeData = []
                const csvall = [];
                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                    console.log(element, 'myelement')

                    const object = {
                        id: element.id,
                        type: element.type,
                        Publication: element.public,
                        End_date: element.end_date,
                        start_day: element.start_date,
                        Image: element.advItem,
                        Advertiestment: element.name,
                    }
                    const objectcsv = {
                        id: element.id,
                        Publication: element.public,
                        End_date: element.end_date,
                        start_day: element.start_date,
                        Advertiestment: element.name,
                    }
                    activeData.push(object)
                    csvall.push(objectcsv)
                }
                setCustomerList(activeData);
                setRows(activeData);
                setUserSearch(activeData);
                setUserList(activeData);
                setCsvlist(csvall)
            } else {
                setCustomerList([]);
                setRows([]);
                setUserSearch([]);
                setUserList([]);
                setCsvlist([])
            }
        }
    }

    console.log(rows, "listname");
    const getimageeUserList = async (startDate, endDate) => {
        // console.log(startDate,"startDate");
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = { type: 'image' }
        if (!!startDate && !!endDate) {
            body.start_day = moment(startDate).format("MM/DD/YYYY")
            body.end_day = moment(endDate).format("MM/DD/YYYY")
        }
        // console.log(start_day,"startDate");
        console.log(body, "body");
        props.props.loaderRef(true)
        const data = await ApiServices.PostApiCall(ApiEndpoint.PROMOTION_LIST, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, "data");
        if (!!data) {

            if (data.status == true && data.data.length > 0) {
                console.log(data.data, 'dataa');
                const inactiveData = [];
                const csvimage = [];
                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                    const object = {
                        id: element.id,
                        type: element.type,
                        Publication: element.public,
                        End_date: element.end_date,
                        start_day: element.start_date,
                        Image: element.advItem,
                        Advertiestment: element.name,
                    }
                    const objectcsv = {
                        id: element.id,
                        Publication: element.public,
                        End_date: element.end_date,
                        start_day: element.start_date,
                        Advertiestment: element.name,
                    }
                    inactiveData.push(object)
                    csvimage.push(objectcsv)
                }
                setimagelist(inactiveData);
                setCsvlist(csvimage)
            } else {
                setimagelist([]);
                setCsvlist([])
            }
        }
    }
    console.log(imagelist, "imagelist");
    const getvideoUserList = async (startDate, endDate) => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = { type: 'video' }
        if (!!startDate && !!endDate) {
            body.start_day = moment(startDate).format("MM/DD/YYYY")
            body.end_day = moment(endDate).format("MM/DD/YYYY")
        }
        console.log(body, "body");
        props.props.loaderRef(true)
        const data = await ApiServices.PostApiCall(ApiEndpoint.PROMOTION_LIST, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        if (!!data) {

            if (data.status == true && data.data.length > 0) {
                console.log(data.data, 'dataa');
                const videolist = [];
                const csvvideo = [];
                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                    console.log(element, "aaaa");
                    const object = {
                        id: element.id,
                        type: element.type,
                        Publication: element.public,
                        End_date: element.end_date,
                        start_day: element.start_date,
                        Image: element.advItem,
                        Advertiestment: element.name,
                    }
                    const objectcsv = {
                        id: element.id,
                        Publication: element.public,
                        End_date: element.end_date,
                        start_day: element.start_date,
                        Advertiestment: element.name,
                    }
                    csvvideo.push(objectcsv)
                    videolist.push(object)
                }
                setvideolist(videolist);
                setCsvlist(csvvideo)
            } else {
                setvideolist([]);
                setCsvlist([])
            }
        }
    }

    const mySerchbtn = (e) => {
        setPage(0)
        const value = e.target.value
        if (typeof value !== 'object') {
            if (!value || value == '') {
                setRows(userSearch);
            } else {
                var filteredData = rows.filter((item) => {
                    console.log(item.description, 'filtrer')
                    let searchValue = item.Advertiestment.toLowerCase()
                    return searchValue.includes(value.toString().toLowerCase())
                })
                setRows(filteredData)
            }
        } else ""
    }
    const userStatusChange = (event) => {

        setUserStatus(event)
        // console.log(event, 'propsststs');
        setRows(customerList)
        if (event == 'image') {
            setRows(imagelist);
            setUserSearch(imagelist)
        }
        if (event == 'video') {
            setRows(videolist);
            setUserSearch(videolist)
        }
    }
    console.log(imagelist, "imagelist");
    const moabahh = (event) => {
        setUserStatus(event)
        console.log(event, 'propsststs');
    }
    const userlistadv = (event) => {

        setUserStatus(event)
        // console.log(event, 'propsststs');
        setRows(customerList)
        if (event == 'image') {
            setImageteg(img);
        }
        if (event == 'video') {
            setvideoteg(video);
        }
    }
    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            getimageeUserList()
            getSingUpUserList()
            getvideoUserList()
            setRows(customerList)
        }
    }, [])


    const advCreate = () => {
        if (!!props.props.profile && !!props.props.profile.token) {
            getimageeUserList()
            getSingUpUserList()
            getvideoUserList()
            setRows(customerList)
        }
    }

    const editFAQ = async (val, id) => {

        console.log(props, 'hellloprops')
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {
            "id_advertisement": id,
            "public": val,
        }
        console.log(body, 'boddy')
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.USER_ADVERTISEMENT_EDIT, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, 'myda11ta22')

        if (!!data) {
            if (data.status == true) {
                console.log(userStatus, 'userStatus');
                if (userStatus == 'all') {
                    getSingUpUserList()
                } else if (userStatus == 'image') {
                    getimageeUserList()
                } else if (userStatus == 'video') {
                    getvideoUserList()
                }
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } else {
            toast.error('Something went wrong.')
        }
    }

    return (
        <>
            <Grid container spacing={0} className={styles.boxmain3}>

                <Grid className={styles.box3} item sm={12} md={5} xs={12} on display={'flex'} justifyContent={'left'}>
                    <Box className={styles.tabname}>
                        <ThemeProvider theme={tabtheme}>
                            <TabContext value={value}  >

                                <TabList onChange={handleChange} aria-label="lab API tabs example"
                                    value={value}
                                    theme={tabtheme}
                                    // textColor="#318D8C"
                                    // indicatorColor="#8E8E8E"
                                    // onChange={handleChange}
                                    TabIndicatorProps={{
                                        style: {
                                            // textColor: '#318D8C',
                                            // backgroundColor: "#57B0AF",
                                        }
                                    }}
                                    aria-label="secondary tabs example" className={styles.maenteb}>
                                    <Tab label="All" onClick={() => userStatusChange("all")} className={styles.nametabs1} value="1" />
                                    <Tab label="Images" onClick={() => userStatusChange("image")} className={styles.nametabs1} value="2" />
                                    <Tab label="Videos" onClick={() => userStatusChange("video")} className={styles.nametabs1} value="3" />
                                </TabList>
                            </TabContext>
                        </ThemeProvider>
                    </Box>
                </Grid>

                <Grid className={styles.popbtn} item sm={12} md={7} xs={12}>
                    <div>
                        <Button className={styles.creatbtn} onClick={handleClickOpenCom}>
                            Create new
                        </Button>
                        <div >
                            <Dialog open={com} onClose={handleCloseCom}
                                className={styles.borderredayasfor}
                                md={{
                                    borderRadius: '25px'
                                }}
                                // fullWidth
                                maxWidth="md"
                            >
                                <div>
                                    <DialogContent className={styles.popupcantenar}>
                                        <Popupform props={props} advCreate={advCreate} closePop={handleCloseCom} userId={advId} />
                                    </DialogContent>
                                </div>
                            </Dialog>
                        </div>
                        <div>
                            <Dialog com={com} onClose={handleCloseCom}>
                                <DialogTitle>Subscribe</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                            <SimpleDialog
                                selectedValue={selectedValue}
                                com={com}
                                onClose={handleCloseCom}
                                userId={advId}
                            >
                            </SimpleDialog>
                        </div>
                        <div>

                            <div>
                                <Dialog
                                    className={styles.popmentabal12}
                                    fullWidth
                                    maxWidth="lg"
                                    borderRadius='30px'
                                    margin='0'
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={open}
                                >
                                    <div className={styles.popmentabal}   >
                                        <BootstrapDialogTitle onClose={handleClose} className={styles.boottatel} >
                                            Promotions/ Ads
                                        </BootstrapDialogTitle>
                                        <Popuptabal props={props} />
                                    </div>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={0} className={styles.hadpeg}>
                <Grid className={styles.inputbox} item xs={12} md={4}  >
                    <input type="text" id='myserchbtn' name="search" placeholder="Search" className={styles.searchbtn} autoComplete="off" onChange={mySerchbtn} />
                </Grid>
                <Grid className={styles.maxbox} item xs={12} md={8}>
                    <Box className={styles.boxdate}  >

                        <DateRangePicker
                            //    selected=moment(startDate).format('LL');
                            selected={dateStart} onChange={startDate => { }}
                            selected={dateEnd} onChange={endDate => {
                                if (!!endDate) {
                                    getimageeUserList(endDate[0], endDate[1])
                                    getSingUpUserList(endDate[0], endDate[1])
                                    getvideoUserList(endDate[0], endDate[1])
                                    setDateStart(endDate[0])
                                    setDateEnd(endDate[1])
                                    // userListfilter(endDate[0], endDate[1])
                                } else {
                                    getimageeUserList()
                                    getSingUpUserList()
                                    getvideoUserList()
                                    setDateStart('')
                                    setDateEnd('')
                                }
                            }}
                            placeholder="SELECT START RANGE - END RANGE"
                            format="LLLL d, yyyy"
                            character="-"
                            caretAs={calenderIcon}
                        />

                    </Box>
                    {/* </Grid>
                <Grid className={styles.maxbox} item xs={12} md={3}> */}
                    <Button className={styles.megobtn} disabled={csvlist.length > 0 ? false : true}>
                        <CSVLink data={csvlist} filename={"promotion.csv"} clssName={styles.csvlinkfor}>
                            Download CSV
                        </CSVLink>
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} md={12} >
                <div className={styles.tabalpading}>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }} className={styles.maentebal}>
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size={dense ? 'small' : 'medium'}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" className={styles.thead}>Advertiestment</TableCell>
                                            <TableCell align="left" className={styles.thead}>Image</TableCell>
                                            <TableCell align="left" className={styles.thead}>Start date</TableCell>
                                            <TableCell align="left" className={styles.thead}>End date</TableCell>
                                            <TableCell align="left" className={styles.thead}>Statistics</TableCell>
                                            <TableCell align="left" className={styles.thead}>Publication</TableCell>
                                            <TableCell align="center" className={styles.thead}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rows)
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.name);
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                return (
                                                    <TableRow>
                                                        <TableCell align="left" scope="row" >

                                                            <Typography className={styles.advtext}> {row.Advertiestment}</Typography>
                                                        </TableCell>

                                                        <TableCell align="left">{row.type == "image" ? <div className={styles.imgandvideo}> <img src={row.Image} /> </div> : <div className={styles.imgandvideo}> <video width={125} height={125} controls><source src={row.Image} type="video/webm" /><source src={row.Image} type="video/mp4" /></video></div>}  </TableCell>
                                                        <TableCell align="left">
                                                            <Box className={styles.datetext12} >
                                                                <Typography className={styles.dateone}>{
                                                                    moment(row.start_day).format("DD/MM/YYYY")
                                                                } </Typography>
                                                                <CalendarMonthIcon className={styles.ikoncom2233} />
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Box className={styles.datetext12} >
                                                                <Typography className={styles.dateone}>{
                                                                    moment(row.End_date).format("DD/MM/YYYY")
                                                                } </Typography>
                                                                <CalendarMonthIcon className={styles.ikoncom2233} />
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="left"> <Link onClick={handleClickOpen} className={styles.akarteg}>View</Link></TableCell>
                                                        <TableCell align="left">
                                                            <SwitchUnstyled component={Root} {...label} id='switch' checked={row.Publication} 
                                                            onChange={((e) => {
                                                                setChecked(e.target.checked)
                                                                editFAQ(e.target.checked, row.id)
                                                                setSwitchcheck(e.target.checked)
                                                                setIdItem(row.id,)
                                                                console.log(e.target.checked, 'checkedv');
                                                                console.log(row.id, 'myvalueee')
                                                            })} />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button
                                                                className={styles.editbtnikon}>
                                                                <img src="./image/edit.png" white={30} height={20} />
                                                            </Button></TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[7, 10, 25, 100]}
                                component="div"
                                className={styles.pagination}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </div>
            </Grid>
        </>
    );
}


function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handlepopClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    return (
        <Dialog onClose={handlepopClose} open={open}>
            <DialogTitle>New Advertisement</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                    <Popupform props={props} closePop={handlepopClose} />
                    <DialogContent className={styles.popupcantenar}>
                        <Popupform props={props} closePop={handlepopClose} />
                    </DialogContent>
                </ListItem>
            </List>
        </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(DataGridDemo)

