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
  const [datascore, setDatascore] = React.useState([]);
  const [therdata, setTherdata] = React.useState('')
  const { activeSupportId, setActiveSupportId, setActiveSupportObject } =
    useContext(SupportContext);
    const [listlegveg, setLegvg] = React.useState('')

    React.useEffect(() => {
      const listtebal = localStorage.getItem("language")
      setLegvg(listtebal);
    }, []);
  const handleClick = (id = string, data = object) => {
    viewSupportMsg(key);
    setUserData(data);
  };

  // const languages = {
  //   en: require('./translations/translations/en.json'),
  //   pl_PL: require('./translations/translations/pl_PL.json')
  // };
  fetch('/pl_PL.json').then((response) => response.json()).then(json => {
    console.log(json, 'adadjjdd')
  })
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
    console.log(data, 'datadata')
    if (data) {
      if (!!data.status && data.status == true) {
        setCategorySearch(data.data);
        setAuditorCount(data.data.locationCount);
        setLocationCount(data.data.auditorCount);
        setCategoryList(data.data.latestAudit);
        setTherdata(data.data.score48)
        setDatascore(data.data.cateScore)
      }
    }
    setUserRender(false);
  };
  const Header = [
    { id: 1, name: listlegveg=='pl_PL'?"اسم الموقع":"Location Name" },
    { id: 2, name: listlegveg=='pl_PL'?"مدقق حسابات":"Auditor" },
    { id: 3, name: listlegveg=='pl_PL'?"تاريخ الوقت":"Date Time " },
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
      name: Yup.string().required(listlegveg=='pl_PL'?"مطلوب اسم.":"Name is required."),
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
              <p className={style.signtxt}>{listlegveg=='pl_PL'?"عدد من المواقع":"Number Of Locations"}</p>
            </Box>

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
              <p className={style.signtxt}>{listlegveg=='pl_PL'?"عدد المراجعين":"Number Of Auditors"}</p>
            </Box>
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
              <p className={style.signnum}> {therdata} </p>
              <p className={style.signtxt}>{listlegveg=='pl_PL'?"المجموع النهائي":"Overall Score"} </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container className={Style.table_main_container}>
        <p className={style.table_title}>{listlegveg=='pl_PL'?"يسجل حسب الفئة":"Score by category"}</p>
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

                          <TableCell
                            className={Style.table_cell}
                          >
                            {listlegveg=='pl_PL'?"فئة":"Category"}
                          </TableCell>
                          <TableCell
                            className={Style.table_cell}
                          >
                           {listlegveg=='pl_PL'?"نتيجة":"score"}
                            
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {datascore.map((item, index) => {
                          console.log(item, "item__");

                          return (
                            <TableRow
                              // className={currentPath == "./dashboard" ? Style.active : ""}
                              key={index}
                            // onClick={() => {
                            //   router.push({
                            //     pathname: "/all_qus_list",
                            //     query: { id: item.id },
                            //   });
                            // }}
                            >
                              <TableCell className={Style.table_cell}>
                                {item.category}
                              </TableCell>
                              <TableCell className={Style.table_cell}>
                                {item.score}
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
      <Grid container className={Style.table_main_container}>
        <p className={style.table_title}> {listlegveg=='pl_PL'?"أحدث تدقيق":"Latest Audit"}</p>
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
