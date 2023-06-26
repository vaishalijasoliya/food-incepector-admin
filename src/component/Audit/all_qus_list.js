import * as React from "react";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import styles from "../../styles/user/paymenttable.module.css";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import { qustionlist } from "../Utils/data";
import { TableComponent } from "../Audit/tablecom_allqus";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { useRouter } from "next/router";
import moment from "moment";

const AUDIT_VIEW_PAGE = (props) => {
  console.log(props, "props");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [dataSearch, setDataSearch] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [dataList, setDatalist] = React.useState([]);
  const [details, setDetails] = React.useState("");
  const [statatics, setStatatics] = React.useState("");
  const [listlegveg, setLegvg] = React.useState('')

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  // const loaderRef = {
  //     token: "is____token",
  //    }
  console.log(details, "loaderrefff__");
  const router = useRouter();
  console.log(router.query.id, "router");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setDataSearch([]);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const handleClickOpenTWO = () => {
    setOpenTWO(true);
  };

  const handleOpen_delete = () => {
    setDeleteOpen(true);
  };

  //  console.log(props.profile.token, 'profile____')

  const getAuditorList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token,
    };
    var body = {
      id_audit: router.query.id,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.AUDIT_VIEW,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    // console.log(data.data[0].qustionlist, data, "api_res_qus");
    if (data) {
      if (data.status) {
        // const Arr = [];
        // for (let outerIndex = 0; outerIndex < data.data.length; outerIndex++) {
        //   const element = data.data[outerIndex];
        //   for (
        //     let innerIndex = 0;
        //     innerIndex < element.questionList.length;
        //     innerIndex++
        //   ) {
        //     const element_ = element.questionList[innerIndex];
        //     let obj = {
        //       category: element.name,
        //       id: element_.id,
        //       name: element_.name,
        //       itemList: element_.itemList,
        //       compliance: element_.compliance,
        //       observation: element_.observation,
        //     };
        //     Arr.push(obj);
        //     console.log(Arr, "is________new___arr", obj);
        //   }
        // }
        console.log(data, "API_RES");
        setDetails(data.details);
        setStatatics(data.statatics);
        const Arr = data.data.flatMap((element) => {
          return element.questionList.map((question) => {
            return {
              category: element.name,
              id: question.id,
              name: question.name,
              itemList: question.itemList,
              compliance: question.compliance,
              observation: question.observation,
            };
          });
        });
        setDatalist(Arr);
        setDataSearch(data.data);
      }
    }
  };

  const Header = [
    { name:listlegveg=="pl_PL"? "فئة":"Category" },
    { name: listlegveg=="pl_PL"?"أسئلة":"Questions" },
    { name: listlegveg=="pl_PL"?"الصور":"Images" },
    { name: listlegveg=="pl_PL"?"امتثال":"Compliance" },
    { name: listlegveg=="pl_PL"?"ملاحظة":"Observation" },
  ];

  const onSearch = (e) => {
    var value_ = e.target.value;
    if (typeof value_ !== "object") {
      if (!value_ || value_ == "") {
        setDatalist(dataSearch);
      } else {
        var filteredData = dataSearch.filter((item) => {
          let searchValue = item.name.toLowerCase();
          return searchValue.includes(value_.toString().toLowerCase());
        });
        setDatalist(filteredData);
      }
    }
  };

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  // console.log(props, "propscheck_____");
  React.useEffect(() => {
    if (router.query.id && props.profile.token) {
      getAuditorList();
    }
  }, [router.query.id]);
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const ActiveArr = [];
    const DeletedArr = [];
    for (let index = 0; index < qustionlist.length; index++) {
      const element = qustionlist[index];
      {
        ActiveArr.push(element);
        DeletedArr.push(element);
      }
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ae802c",
      },
    },
  });
  const List_object = {
    name: "01 Cafe",
    datetime: "29/05/2023 11:41 AM",
    total_score: "2",
    Grade: "Below Average (0%)",
    Compliant: "0",
    na: "151",
    Applicable: "1",
    minor: "2",
    major: "1",
    Critical: "2",
    auditor: "mirav jasoliya",
  };

  console.log(details, "is_________details");
  function convertUTCToTimezone(utcDt, utcDtFormat = null, timezone =  'Asia/Riyadh') {
    console.log('called');
    return moment.utc(utcDt, utcDtFormat).tz(timezone).format('DD/MM/YYYY hh:mm A');
}
  return (
    <Grid container>
      <Grid container display={"flex"} className={styles.hadpeg}>
        {/* <Grid className={styles.inputbox} item sm={12} md={3} xs={12}>
          <Box className={styles.boxreting} display={"flex"}>
            <input
              type="text"
              id="myserchbtn"
              name="search"
              placeholder="Search"
              className={styles.searchbtn}
              autoComplete="off"
              onChange={(e) => {
                onSearch(e);
              }}
            />
          </Box>
        </Grid> */}
        {typeof details == "object" ? (
          <Grid md={12}>
            <Grid container className={styles.top_box_}>
              <Grid md={6}>
                <Typography>{listlegveg=="pl_PL"?"موقع:":"Location:"} {details.auditLocation.name}</Typography>
                <Typography>
                {listlegveg=="pl_PL"?"مجموع النقاط:":"Total Score:"} {details.audit_score}
                </Typography>
                <Typography>
                {listlegveg=="pl_PL"?"بداية التدقيق:":"Audit Start:"}   {moment(details.audit_start).format("DD/MM/YYYY h:mm A")}
                </Typography>
                <Typography>
                {listlegveg=="pl_PL"?"نهاية التدقيق:":"Audit End:"}{moment(details.audit_end).format("DD/MM/YYYY h:mm A")}
                </Typography>
              </Grid>
              <Grid md={6}>
                <Typography>
                {listlegveg=="pl_PL"?"التاريخ الوقت:":"Date Time:"}
                  {/* {moment.utc(details.createdAt,null).tz('Asia/Riyadh').format('DD/MM/YYYY hh:mm A')} */}
                  {/* {convertUTCToTimezone(details.createdAt)} */}
                  {`${moment(details.createdAt).format("DD/MM/YYYY")} 
                  ${moment(details.createdAt).format("LT")}`}
                </Typography>
                <Typography>{listlegveg=="pl_PL"?"درجة:":"Grade:"} {statatics.grade}</Typography>
                <Typography>{listlegveg=="pl_PL"?"وقت المراجعة:":"Audit Time:"} {statatics.audit_time}</Typography>
                <Typography>{listlegveg=="pl_PL"?"موقع GPS:":"Gps Location:"} {statatics.gps_location}</Typography>
              </Grid>
              <Grid md={4}>
                <Typography>
                {listlegveg=="pl_PL"?"متوافق:":"Compliant:"}{statatics.compliantCount}
                </Typography>
                <Typography>
                {listlegveg=="pl_PL"?"N / C فرعي:":"N/C Minor:"}{statatics.minorCount}
                </Typography>
              </Grid>
              <Grid md={4}>
                <Typography>{listlegveg=="pl_PL"?"غير متاح:":"N/A:"}{statatics.naCount}</Typography>
                <Typography>
                {listlegveg=="pl_PL"?"N / C رئيسي:":"N/C Major:"}{statatics.majorCount}
                </Typography>
              </Grid>
              <Grid md={4}>
                <Typography>
                {listlegveg=="pl_PL"?"ملائم:":"Applicable:"}{statatics.applicableCount}
                </Typography>
                <Typography>
                {listlegveg=="pl_PL"?"غير حرج:":"N/C Critical:"}{statatics.criticalCount}
                </Typography>
              </Grid>
              <Grid md={4}>
                <Typography>{listlegveg=="pl_PL"?"مدقق حسابات:":"Auditor:"} {details.auditUser.name}</Typography>
              </Grid>
              <Grid md={4}>
                <Box className={styles.image_box_top}>
                  <img src={details.audit_selfi} />
                </Box>
              </Grid>
              <Grid md={4}>
                <Box className={styles.image_box_top}>
                  <img src={details.audit_sign} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>

      <Grid item xs={12} md={12}>
        <div>
          <ThemeProvider theme={theme}>
            <Paper
              sx={{
                width: "100%",
                mb: 2,
                padding: "0px",
                paddingTop: "10px",
              }}
              className={styles.maentebal2}
            >
              <TableComponent
                handleClickOpenTWO={handleClickOpenTWO}
                rowsPerPage={rowsPerPage}
                page={page}
                handleOpen_delete={handleOpen_delete}
                data={dataList}
                Header={Header}
                // loaderref={loaderRef}
              />
              <TablePagination
                rowsPerPageOptions={[7, 10, 25, 100]}
                component="div"
                className={styles.bakgvcal}
                count={dataList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </ThemeProvider>
        </div>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

const calenderIcon = () => {
  return <img src="./image/calender.png" className="calenderimg" />;
};

export default connect(mapStateToProps, mapDispatchToProps)(AUDIT_VIEW_PAGE);
