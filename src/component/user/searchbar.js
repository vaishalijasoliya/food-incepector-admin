import * as React from 'react';
import Box from '@mui/material/Box';
import styles from '../../styles/user/searchbar.module.css';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
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

export default function PermanentDrawerLeft() {
  
  return (
    <Grid container spacing={0} className={styles.hadpeg}>
      <Grid className={styles.inputbox} item xs={12} md={6}  >
        <Box className={styles.boxreting} display={'flex'}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon className={styles.inputikon} />
            </SearchIconWrapper>
            <StyledInputBase className={styles.sarsname}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        </Grid>
        <Grid className={styles.maxbox} item xs={12} md={6}>
                  <Box className={styles.boxdate} display={'flex'} >
                  </Box>
          <Button  className={styles.megobtn}>
            Download CSV
          </Button>
        </Grid>
      </Grid>
      );
}
