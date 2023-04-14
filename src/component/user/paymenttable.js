import * as React from "react";
import styles from "../../styles/user/paymenttable.module.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Auditor_page from "../Auditor/auditor";

export default function DataGridDemo(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userStatus, setUserStatus] = React.useState("Sign up");
  const [tableData, setTableData] = React.useState([]);
  const [csvlist, setCsvlist] = React.useState([]);

  return (
    <>
      <Grid className={styles.tebalrow} item xs={12} md={12}>
        <Box className={styles.boxtebalmc}>
          <Auditor_page
            status={userStatus}
            csvlist={csvlist}
            props={props.props}
            userList={tableData}
          />
        </Box>
      </Grid>
    </>
  );
}
