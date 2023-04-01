import { Grid, Button } from "@mui/material"
import StickyHeadTable from "./nextdash"
import style from '../../styles/dashboard.module.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import { ThemeProvider, createTheme } from '@mui/material/styles';


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

const Mainscr = (props) => {


    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Grid container >

            <StickyHeadTable props={props} />

        </Grid>

    )
}

export default Mainscr
