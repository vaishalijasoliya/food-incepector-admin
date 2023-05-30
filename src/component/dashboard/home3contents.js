import { Grid, Box, LinearProgress } from "@mui/material";
import style from "../../styles/dashboard.module.css";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import React, { useContext } from "react";
import SupportContext from "../../context/SupportContext";

import { createTheme } from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import styles from "../../styles/user/paymenttable.module.css";
import Style from "../Auditor/auditor.module.css";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const Usercount = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [aciveData, setActiveData] = React.useState([]);
  const [categoryList, setCategoryList] = React.useState([]);
  const [categorySearch, setCategorySearch] = React.useState([]);
  const [userRender, setUserRender] = React.useState(true);
  const [locationCount, setLocationCount] = React.useState(0);
  const [auditorCount, setAuditorCount] = React.useState(0);

  const { activeSupportId, setActiveSupportId, setActiveSupportObject } =
    useContext(SupportContext);

  const handleClick = (id = string, data = object) => {
    viewSupportMsg(key);
    setUserData(data);
  };

  const getdashgetdata = async () => {
    console.log("headers");
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {};
    props.props.loaderRef(true);
    console.log(props.props, "loaderref");
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.DASH_BOARD,
      JSON.stringify(body),
      headers
    );
    // console.log(data.data, "data____");

    props.props.loaderRef(false);

    if (data) {
      if (!!data.status && data.status == true) {
        setCategorySearch(data.data);
        setAuditorCount(data.data.locationCount);
        setLocationCount(data.data.auditorCount);
        setCategoryList(data.data.latestAudit);
      }
    }
    setUserRender(false);
  };
  const Header = [
    { id: 1, name: "Location Name" },
    { id: 2, name: "Auditor" },
    { id: 3, name: "Date Time " },
  ];

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ae802c",
      },
    },
  });
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };

  React.useEffect(() => {
    if (
      userRender &&
      props.props &&
      props.props.profile &&
      props.props.profile.token
    ) {
      getdashgetdata();
    }
  }, [props, userRender]);

  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleOpen_delete = () => {
    setDeleteOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
    }),
    onSubmit: (values) => {
      if (open == true) {
        onAddCategory();
      } else if (openEdit == true) {
        onEditCategory();
      }
      formik.resetForm();
    },
  });

  const router = useRouter();

  return (
    <>
      <Grid container spacing={4} style={{ flexWrap: "wrap" }}>
        <Grid item xs={12} md={4} className={style.topgrid}>
          <Box className={style.singdiv}>
            <Box>
              <div className={style.threeuser}>
                <img src="./image/3 User.svg" />
              </div>
              <p className={style.signnum}>{locationCount} </p>
              <p className={style.signtxt}>Number Of Locations</p>
            </Box>
            {/* <Box
              sx={{ width: "153px", color: "red" }}
              className={style.signuserbox}
            >
              <LinearProgress
                variant="determinate"
                value={80}
                height="8"
                className={style.signuser}
                id={style.linegrf}
              />
            </Box> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className={style.topgrid}>
          <Box className={style.singdiv2}>
            <Box>
              <Box>
                <div className={style.myprofile}>
                  <img src="./image/myprofile.svg" />
                </div>
              </Box>
              <p className={style.signnum}> {auditorCount} </p>
              <p className={style.signtxt}>Number Of Auditors</p>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container className={Style.table_main_container}>
        <p className={style.table_title}>Latest Audit</p>
        <Grid container>
          <Grid item xs={12} md={12}>
            <div>
              <Box sx={{ width: "100%" }}>
                <Paper
                  sx={{ width: "100%", mb: 2 }}
                  className={styles.maentebal2}
                >
                  <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                      <TableHead>
                        <TableRow className={Style.TableRow}>
                          {Header.map((item, index) => {
                            return (
                              <TableCell
                                key={item.id}
                                className={Style.table_cell}
                              >
                                {item.name}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {categoryList.map((item, index) => {
                          console.log(item, "item__");

                          return (
                            <TableRow
                              // className={currentPath == "./dashboard" ? Style.active : ""}
                              key={index}
                              onClick={() => {
                                router.push({
                                  pathname: "/all_qus_list",
                                  query: { id: item.id },
                                });
                              }}
                            >
                              <TableCell className={Style.table_cell}>
                                {item.location_name}
                              </TableCell>
                              <TableCell className={Style.table_cell}>
                                {item.auditorDetail.name}
                              </TableCell>
                              <TableCell className={Style.table_cell}>
                                {moment(item.createdAt).format(
                                  "DD/MM/YYYY h:mm A"
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Usercount;
