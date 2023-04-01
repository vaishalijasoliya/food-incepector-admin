import * as React from "react";
import styles from '../../styles/promotion/promotionlist.module.css';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Ratingbox from './ratingbox';
import Typography from '@mui/material/Typography';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';


const columns = [
    { id: 'User', label: 'User', minWidth: 150, align: 's', },
    { id: 'Email', label: 'Email', minWidth: 150, align: 'left', },
    {
        id: 'Phone',
        label: 'Phone',
        minWidth: 90,
        align: 'left',
    },
    {
        id: 'Gender',
        label: 'Gender',
        minWidth: 70,
        align: 'left',
    },
];

function createData(User, Name, Email, Phone, Gender,) {
    // const density = population / size;
    return { User, Name, Email, Phone, Gender, };
}

// const rows = [
//     createData('./image/Ellipse 17.png', 'cark Chen', 'markchen@gmail.com', +13672888929, 'Male'),
//     createData('./image/Ellipse 17.png', 'cark Chen', 'markchen@gmail.com', +13672888929, 'Male'),
//     createData('./image/Ellipse 17.png', 'cark Chen', 'markchen@gmail.com', +13672888929, 'Male'),
//     createData('./image/Ellipse 17.png', 'cark Chen', 'markchen@gmail.com', +13672888929, 'Male'),
//     createData('./image/Ellipse 17.png', 'cark Chen', 'markchen@gmail.com', +13672888929, 'Male'),
// ];

// export default function StickyHeadTable() {


const DataGridDemo = (props) => {

    const [impressionsCount, setImpressionsount] = React.useState(0);
    const [clickCount, setClickCount] = React.useState(0);
    const [viewCount, setViewCount] = React.useState(0);
    const [userList, setUserList] = React.useState([])
    const [impressionsList, setimpressionsList] = React.useState([]);
    const [clickList, setClickList] = React.useState([]);
    const [viewList, setViewList] = React.useState([]);
    const [defaultList, setDefaultlist] = React.useState([])
    // const [valActive, setValActive] = React.useState = ('')
    const [active, setActive] = React.useState('impression')
    console.log(props, 'my111props')


    const usercountlist = async () => {

        console.log(props, 'mytable pops')

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.props.profile.token
        }
        var body = {
            "id_advertisement": 1,
        }
        props.props.props.loaderRef(true)
        const data = await ApiServices.PostApiCall(ApiEndpoint.VIEW_USER_LIST, JSON.stringify(body), headers);
        props.props.props.loaderRef(false)
        console.log(data.data, 'mydsatat')
        if (!!data) {
            if (data.status == true) {
                setImpressionsount(data.data.advImpressionUserCount);
                setClickCount(data.data.advClickUserCount)
                setViewCount(data.data.advViewUsercount)
                setimpressionsList(data.data.advImpressionUserList)
                setClickList(data.data.advClickUserList)
                setViewList(data.data.advViewUserList)
            }
        }
    }

    const tabChange = (status) => {

        if (status == 'impression') {
            setUserList(impressionsList)
            setDefaultlist(impressionsList)
            setActive("impression")
        } else if (status == 'click') {
            setUserList(clickList)
            setActive("click")
        } else if (status == 'view') {
            setUserList(viewList)
            setActive("view")
        } else {
            ""
        }
    }
    // console.log(tabName, 'mywwyyy')
    React.useEffect(() => {
        if (!!props.props.props.profile && !!props.props.props.profile.token) {
            usercountlist()
            setUserList(clickList)

        }
    }, [])


    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    console.log(active, 'active class')


    return (

        <Grid container className={styles.padingcentar}>
            <Grid item xs={12} md={12}>

                <Grid container spacing={1} className={styles.boxmain} id='maingrid'>
                    <Grid className={styles.box1} item sm={12} md={3} on >
                        <button display={'flex'} key={1} className={active == 'impression' ? styles.activebtn : ""} onClick={() => { tabChange('impression') }} id={styles.btntab1}>
                            <Typography variant="h6" className={styles.boxlast}>
                                {impressionsCount}
                            </Typography>
                            <Typography variant="h6" className={styles.textperegaraf}>
                                Impressions
                            </Typography>
                        </button>

                    </Grid>
                    <Grid className={styles.box1} item sm={12} md={3} >
                        <button display={'flex'} key={1} className={active == 'click' ? styles.activebtn : ""} onClick={() => { tabChange('click') }} id={styles.btntab}>
                            <Typography variant="h6" className={styles.boxlast}>
                                {clickCount}
                            </Typography>
                            <Typography sx={{ p: 1 }} className={styles.textperegaraf}>
                                Clicks
                            </Typography>
                        </button>
                    </Grid>
                    <Grid className={styles.box1} item sm={12} md={3}  >
                        <button className={active == 'view' ? styles.activebtn : ""} display={'flex'} onClick={() => { tabChange('view') }} id={styles.btntab}>
                            <Typography variant="h4" className={styles.boxlast}>
                                {viewCount}
                            </Typography>
                            <Typography sx={{ p: 1 }} className={styles.textperegaraf}>
                                Views
                            </Typography>
                        </button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className={styles.tebalrow} item xs={12} md={12} >
                <Box >
                    <Paper sx={{ width: '100%' }} className={styles.maentebal}>
                        {userList.length > 0 ? <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" className={styles.thead}>User</TableCell>
                                        <TableCell align="center" className={styles.thead}>Email</TableCell>
                                        <TableCell align="center" className={styles.thead}>Phone</TableCell>
                                        <TableCell align="center" className={styles.thead}>Gender</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userList.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center"><div className={styles.vatar}><Avatar alt="Profile Picture" src={row.profile_photo} /> <span className={styles.pohottest}>{row.first_name} {row.last_name}</span></div></TableCell>
                                            <TableCell align="center"> {row.email}</TableCell>
                                            <TableCell align="center">{row.phone_number}</TableCell>
                                            <TableCell align="center">{row.gender} </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : ''}
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    )
}


export default DataGridDemo