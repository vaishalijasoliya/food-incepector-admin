import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '../../styles/user/ratingbox.module.css';
import Grid from '@mui/material/Grid';


const index = () => {

  return (
    <>
      <Grid container spacing={1} className={styles.boxmain3}>
        <Grid className={styles.box3} item sm={12} md={3} on >
          <button display={'flex'} className={styles.boxreting}>
            <Typography variant="h6" className={styles.boxlast}>
              27k
            </Typography>
            <Typography variant="h6" className={styles.textperegaraf}>
              Impressions
            </Typography>
          </button>

        </Grid>
        <Grid className={styles.box1} item sm={12} md={3} >
          <button className={styles.boxreting2} display={'flex'}>
            <Typography variant="h6" className={styles.boxlast}>
              10k
            </Typography>
            <Typography sx={{ p: 1 }} className={styles.textperegaraf}>
              Clicks
            </Typography>
          </button>
        </Grid>
        <Grid className={styles.box1} item sm={12} md={3}  >
          <button className={styles.boxreting2} display={'flex'}>
            <Typography variant="h4" className={styles.boxlast}>
              20k
            </Typography>
            <Typography sx={{ p: 1 }} className={styles.textperegaraf}>
              Views
            </Typography>
          </button>
        </Grid>
      </Grid>
    </>
  );
};
export default index;