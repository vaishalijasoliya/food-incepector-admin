import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import style from "../../styles/dashboard.module.css";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Rating,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import moment from "moment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import {
  Tabs,
  Tab,
  Fade,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { CSVLink, CSVDownload } from "react-csv";
import { DateRangePicker } from "rsuite";
import { date, string } from "yup";
import { SelectChangeEvent } from "@mui/material/Select";
// import FormDialog from './popup';
import { toast } from "react-toastify";

function createData(
  name = string,
  code = string,
  population = number,
  z
  // size = number,
) {
  return { name, code, population, size };
}

const btnthem = createTheme({
  palette: {
    primary: {
      main: "#FF4B55",
    },
  },
});

const tabtheme = createTheme({
  palette: {
    primary: {
      main: "#32908F",
    },
  },
});

export default function StickyHeadTable(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  console.log(props, "mypropsss");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [pendingReviewList, setPendingReviewList] = React.useState([]);
  const [approveReviewList, setApproveReviewList] = React.useState([]);
  const [rejectReviewList, setRejectReviewList] = React.useState([]);
  const [flagReviewList, setFlageReviewList] = React.useState([]);
  const [reviewStatus, setReviewStatus] = React.useState("pending");
  const [subAdminData, setSubAdminData] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [userSearch, setUserSearch] = React.useState([]);
  const [cvsdata, setCvsdata] = React.useState([]);
  const [userAccount, setuserAccount] = React.useState([]);
  const [tableSort, setTableSort] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [sort, setSort] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [popValue, setPopvalue] = React.useState([]);
  const [fullData, setFulldata] = React.useState([]);
  const [userId, setUserid] = React.useState([]);
  const [rowName, setRowname] = React.useState([]);
  const [reviewRow, setReviewrow] = React.useState([]);
  const [userSend, setUsersend] = React.useState([]);
  const [openSend, setOpensend] = React.useState(false);
  const [rowStatus, setRowstatus] = React.useState([]);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [sortData, setSortdata] = React.useState([]);
  const [myData, setMydata] = React.useState({});
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const reviewViewuser = async (startdate, enddate) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.props.profile.token,
    };
    var body = {};
    if (!!startdate && !!enddate) {
      body.start_day = moment(startdate).format("MM/DD/YYYY");
      body.end_day = moment(enddate).format("MM/DD/YYYY");
    }
    props.props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_REVIEW_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        const arr = [];
        var pendingarr = [];
        var approvearr = [];
        var rejectarr = [];
        var flagearr = [];
        var alldatalist = [];
        for (let index = 0; index < data.data.length; index++) {
          var element = data.data[index];
          // console.log(element.status, 'stattt')

          const obj = {
            name: {
              myname: element.userReciever.first_name,
              mylast: element.userReciever.last_name,
              time: moment(element.createdAt).fromNow(),
              profilphoto: element.userReciever.profile_photo,
              sendpic: element.userSender.profile_photo,
            },
            review: {
              text1: "Authenticity",
              rat1: element.Authenticity,
              text2: "Personality",
              rat2: element.Personality,
              text3: "Data Experience",
              rat3: element.DateExperience,
            },
            comment: element.comment,
            status: element.status,
            id: element.id,
          };
          const csvobj = {
            Username: element.userReciever.first_name + ' ' + element.userReciever.last_name,
            review: (element.average).toFixed(2),
            comment: element.comment,
            status: element.status,
        }
           alldatalist.push(csvobj)
          if (element.status == "pending") {
            pendingarr.push(obj);
          } else if (element.status == "approve") {
            approvearr.push(obj);
          } else if (element.status == "reject") {
            rejectarr.push(obj);
          } else {
            flagearr.push(obj);
          }
          arr.push(obj);
        }
        // setData(alldatalist)
        setUsersend(element.userSender);
        setUserid(element.userReciever);
        console.log(element.userReciever.id, "myarray");
        setRows(arr);
        setCvsdata(alldatalist);
        setUserList(pendingarr);
        setPendingReviewList(pendingarr);
        setApproveReviewList(approvearr);
        setRejectReviewList(rejectarr);
        setFlageReviewList(flagearr);
        setFulldata(element);
      } else {
        setRows([]);
        setCvsdata([]);
        setUserList([]);
        setPendingReviewList([]);
        setApproveReviewList([]);
        setRejectReviewList([]);
        setFlageReviewList([]);
        setFulldata([]);
      }
    }
  };
  React.useEffect(() => {
    if (!!props.props.props.profile && !!props.props.props.profile.token) {
      reviewViewuser();
      setUserList(pendingReviewList);
      setUserSearch(pendingReviewList);
    }
  }, []);
  console.log(startDate, "startdate");
  console.log(fullData, "fullll");

  console.log(reviewStatus, "reviewStatus");
  // var status = reviewStatus
  // console.log(status, "stay");
  // console.log(status, 'reviewstatus')
  const tabChange = (status) => {
    setReviewStatus(status);
    if (status == "pending") {
      setUserList(pendingReviewList);
      setUserSearch(pendingReviewList);
    } else if (status == "approve") {
      setUserList(approveReviewList);
      setUserSearch(approveReviewList);
    } else if (status == "reject") {
      setUserList(rejectReviewList);
      setUserSearch(rejectReviewList);
    } else {
      setUserList(flagReviewList);
      setUserSearch(flagReviewList);
    }
  };
  console.log(rows, "rows");

  const myreviewUpdate = async (id, status, value) => {
    console.log(props, "mypropsss");
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.props.profile.token,
    };
    var body = {
      id_review: id,
      status: status,
    };

    props.props.props.loaderRef(true);
    var mydata = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_REVIEW_UPDATE,
      JSON.stringify(body),
      headers
    );
    props.props.props.loaderRef(false);
    console.log(mydata, "my dataa1");
    if (!!mydata) {
      if (!!mydata.status == true) {
        reviewViewuser();
        toast.success(mydata.message);
      }
    }
  };

  for (let index = 0; index < userList.length; index++) {
    var myelement = userList[index];
    console.log(myelement, "myelementstat");
  }

  const mySerchbtn = (e) => {
    const value = e.target.value;
    console.log(value);

    if (typeof value !== "object") {
      if (!value || value == "") {
        setUserList(userSearch);
      } else {
        var filteredData = userSearch.filter((item) => {
          let searchValue =
            item.name.myname.toLowerCase() +
            " " +
            item.name.mylast.toLowerCase();
          return searchValue.includes(value.toString().toLowerCase());
        });
        setUserList(filteredData);
      }
    }
  };
  // const sortbtn = (e) => {
  //     const sortvalue = e.target.value
  //     console.log(value)

  //     if (typeof value !== 'object') {
  //         if (!value || value == '') {
  //             setSort(userSearch);
  //         } else {
  //             var sortData = userSearch.filter((items) => {
  //                 let sortvalue = items.status
  //             })
  //         }
  //     }
  // }

  var tabcontainer = document.getElementById("tabs");
  var tab = document.getElementsByClassName("active");

  for (let index = 0; index < tab.length; index++) {
    tab[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.repeat("active", "");
      this.className += "active";
    });
  }

  console.log(moment(startDate).format("MMM Do YYYY"), "setdate");
  console.log(endDate, "mydate");

  // console.log(myelement.comment, 'my1ele')

  const handleClickOpen = () => {
    setOpen(true);
    console.log(rowName, "rowname");
  };
  const handleClose = () => {
    setOpen(false);
  };
  // console.log(myData, "reviewrow")
  for (let index = 0; index < userList.length; index++) {
    var myelement = userList[index];
  }
  // console.log(flagReviewList.map((myrow) => {
  //     myrow.status
  // }), 'flagggre')

  const handle2ndClickOpen = () => {
    setOpensend(true);
    console.log(rowStatus, "rowstatus");
  };

  const handle2ndClose = () => {
    setOpensend(false);
  };

  const handlemyChange = (newValue) => {
    setStartDate(newValue);
  };

  const datestyles = {
    width: "260px",
    display: "block",
    height: "56px",
    border: "1px solid black",
    borderRadius: "16px",
  };

  const calenderIcon = () => {
    return (
      <img src="./image/calender.png" className="calenderimg"/>
    )
  }

  return (
    <>
      <div className={style.srchbtndiv}>
        <Grid container spacing={3}>
          <Grid item sm={12} xs={12} md={6} className={style.srchdiv}>
            <form>
              <input
                type="text"
                id="myserchbtn"
                name="search"
                placeholder="Search"
                className={style.searchbtn}
                autoComplete="off"
                onChange={mySerchbtn}
              />
              {/* {!!myelement ? (
                myelement.status == "flag" ? (
                  <Button className={style.sortbtn}>
                    {" "}
                    <img src="./image/sort btn.svg" />{" "}
                  </Button>
                ) : (
                  ""
                )
              ) : (
                ""
              )} */}
            </form>
          </Grid>
          <Grid item sm={12} xs={12} md={6} className={style.datediv}>
          <Box className={style.boxdate}>
            <DateRangePicker
              selected={dateStart}
              onChange={(startDate) => {}}
              selected={dateEnd}
              onChange={(endDate) => {
                if (!!endDate) {
                  setDateStart(endDate[0]);
                  setDateEnd(endDate[1]);
                  reviewViewuser(endDate[0], endDate[1]);
                } else {
                  setDateStart("");
                  setDateEnd("");
                  reviewViewuser();
                }
              }}
              placeholder="SELECT START RANGE - END RANGE"
              format="LLLL d, yyyy"
              character="-"
              caretAs={calenderIcon}
            />
            </Box>
            <ThemeProvider theme={btnthem}>
              <Button
                className={style.btncvs}
                disabled={cvsdata.length > 0 ? false : true}
              >
                <CSVLink
                  data={cvsdata}
                  filename={"reviews.csv"}
                  style={{ color: "#FF4B55", textDecoration: "none" }}
                >
                  Download CSV
                </CSVLink>
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>

      {/* 1st pop up */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { borderRadius: "30px" } }}
      >
        <div className={style.popupdiv}>
          <div className={style.poptiteldiv}>
            <Typography variant="h5" className={style.popuptitel}>
              Review Details
            </Typography>
          </div>

          <div className={style.popimgdiv}>
            <div className={style.leftdiv}>
              <div className={style.popleftdiv}>
                <Avatar
                  src={!!rowName.sendpic ? rowName.sendpic : "M"}
                  className={style.bigpic}
                ></Avatar>
                {/* <img src={$('#rowimg').val} className={style.bigpic} /> */}
              </div>
              <div className={style.textpop}>
                <Typography variant="p" className={style.leftname} id="">
                  {rowName.myname} {rowName.mylast}
                </Typography>
                <Typography variant="p" className={style.lefttime}>
                  {rowName.time}
                </Typography>
              </div>
            </div>
            <div className={style.arrowdiv}>
              <ArrowForwardRoundedIcon className={style.poparrow} />
            </div>
            <div className={style.leftdiv}>
              <div className={style.popleftdiv}>
                <Avatar
                  src={!!userSend.profilphoto ? userSend.profilphoto : "M"}
                  className={style.bigpic}
                ></Avatar>
              </div>
              <div className={style.textpop}>
                <Typography variant="p" className={style.leftname}>
                  {userSend.first_name} {userSend.last_name}
                </Typography>
                <Typography variant="p" className={style.lefttime}>
                  {rowName.time}
                </Typography>
              </div>
            </div>
          </div>
          <div className={style.popratdiv}>
            <div className={style.popreview}>
              <Typography variant="body1" className={style.rat1}>
                {reviewRow.text1}
              </Typography>
              <Typography variant="body1">
                {" "}
                <Rating
                  readOnly
                  name="size-medium"
                  defaultValue={reviewRow.rat1}
                  className={style.myratingpop}
                />{" "}
              </Typography>
            </div>
            <div className={style.popreview}>
              <Typography variant="body1" className={style.rat1}>
                {reviewRow.text2}
              </Typography>
              <Typography variant="body1">
                {" "}
                <Rating
                  readOnly
                  name="size-medium"
                  defaultValue={reviewRow.rat2}
                  className={style.myratingpop}
                />{" "}
              </Typography>
            </div>
            <div className={style.popreview}>
              <Typography variant="body1" className={style.rat1}>
                {reviewRow.text3}
              </Typography>
              <Typography variant="body1">
                {" "}
                <Rating
                  readOnly
                  name="size-medium"
                  defaultValue={reviewRow.rat3}
                  className={style.myratingpop}
                />{" "}
              </Typography>
            </div>
          </div>
          <div className={style.cmtdiv}>
            <Typography variant="p" className={style.commenttxt}>
              {userId.comment}
            </Typography>
          </div>
          <div className={style.popbtndiv}>
            {userId.status == "pending" ? (
              <>
                <Button
                  variant="contained"
                  value={userId.id}
                  className={style.acpt}
                  id={style.status}
                  onClick={(e) => {
                    myreviewUpdate(e.target.value, "active");
                  }}
                >
                  {" "}
                  Approve
                </Button>
                <Button
                  variant="contained"
                  value={userId.id}
                  className={style.rgct}
                  id={style.status}
                  onClick={(e) => {
                    myreviewUpdate(e.target.value, "reject");
                  }}
                >
                  {" "}
                  Reject
                </Button>
                <Button
                  variant="contained"
                  value={userId.id}
                  className={style.flag}
                  id={style.status}
                  onClick={(e) => {
                    myreviewUpdate(e.target.value, "flag");
                  }}
                >
                  {" "}
                  Flag{" "}
                </Button>
              </>
            ) : userId.status == "approve" ? (
              <>
                <Button
                  variant="contained"
                  className={style.remv}
                  id={style.status}
                  onClick={(e) => {
                    myreviewUpdate(e.target.value, "remove");
                  }}
                >
                  {" "}
                  Remove{" "}
                </Button>
              </>
            ) : userId.status == "reject" ? (
              <>
                <Typography variant="p" className={style.rjcttxt}>
                  {" "}
                  Rejected{" "}
                </Typography>
              </>
            ) : userId.status == "flag" ? (
              <>
                <Typography variant="p" className={style.rjcttxt}>
                  {" "}
                  Flagged{" "}
                </Typography>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </Dialog>
      {/* 1st pop up */}

      {/* 2nd pop up */}

      <Dialog open={openSend} PaperProps={{ style: { borderRadius: "24px" } }}>
        <div className={style.sendpopdiv}>
          <div className={style.containersend}>
            <div className={style.sendpopimg}>
              <div className={style.leftsend}>
                <Avatar
                  src={!!userSend.profilphoto ? userSend.profilphoto : "M"}
                  className={style.bigpic}
                ></Avatar>
              </div>
              <div className={style.rightsend}>
                <Typography variant="h5" className={style.rightname}>
                  {userSend.first_name} {userSend.last_name}
                </Typography>
                <Typography variant="p" className={style.righttxt}>
                  {approveReviewList.length} Accepted Rating
                </Typography>
                <Typography
                  variant="p"
                  className={style.righttxt}
                  style={{ marginTop: "15px" }}
                >
                  {pendingReviewList.length} Pending Rating
                </Typography>
              </div>
            </div>
            <div className={style.popdetails}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div className={style.occupationdiv}>
                    <div className={style.occupationimg}>
                      <img src="./image/bag.svg" className={style.bagimg} />
                    </div>
                    <div className={style.occupationtxt}>
                      <Typography variant="p" className={style.maintitel}>
                        Occupation
                      </Typography>
                      <Typography variant="p" className={style.maintext}>
                        {userSend.occupation}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={style.occupationdiv}>
                    <div className={style.occupationimg}>
                      <img src="./image/men.svg" className={style.bagimg} />
                    </div>
                    <div className={style.occupationtxt}>
                      <Typography variant="p" className={style.maintitel}>
                        Age
                      </Typography>
                      <Typography variant="p" className={style.maintext}>
                        {userSend.age}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={style.occupationdiv}>
                    <div className={style.occupationimg}>
                      <img
                        src="./image/location.svg"
                        className={style.bagimg}
                      />
                    </div>
                    <div className={style.occupationtxt}>
                      <Typography variant="p" className={style.maintitel}>
                        Location
                      </Typography>
                      <Typography variant="p" className={style.maintext}>
                        {" "}
                        {userSend.location}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={style.occupationdiv}>
                    <div className={style.occupationimg}>
                      <img src="./image/heart.svg" className={style.bagimg} />
                    </div>
                    <div className={style.occupationtxt}>
                      <Typography variant="p" className={style.maintitel}>
                        Civil Status
                      </Typography>
                      <Typography variant="p" className={style.maintext}>
                        {userSend.civil_status}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div className={style.occupationdiv}>
                    <div className={style.occupationimg}>
                      <img
                        src="./image/notebook.svg"
                        className={style.bagimg}
                      />
                    </div>
                    <div className={style.occupationtxt}>
                      <Typography variant="p" className={style.maintitel}>
                        Biography
                      </Typography>
                      <Typography variant="p" className={style.maintext}>
                        {userSend.biography}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className={style.clsbtndiv}>
              <Button className={style.clsbtn} onClick={handle2ndClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* 2nd pop up */}

      <div className={style.tabdiv}>
        <ThemeProvider theme={tabtheme}>
          <TabContext value={value}>
            <Tabs
              value={value}
              onChange={handleChange}
              className={style.tab}
              theme={tabtheme}
              id="tabs"
            >
              <Tab
                value="pending"
                className={
                  reviewStatus == "pending" ? style.selectedTab : style.tabpanel
                }
                selected={true}
                label="Pending"
                onClick={() => {
                  tabChange("pending");
                }}
              />
              <Tab
                value="approved"
                className={
                  reviewStatus == "approve" ? style.selectedTab : style.tabpanel
                }
                label="Approved"
                onClick={() => {
                  tabChange("approve");
                }}
              />
              <Tab
                value="reject"
                className={
                  reviewStatus == "reject" ? style.selectedTab : style.tabpanel
                }
                label="Rejected"
                onClick={() => {
                  tabChange("reject");
                }}
              />
              <Tab
                value="flaged"
                className={
                  reviewStatus == "flag" ? style.selectedTab : style.tabpanel
                }
                label="Flagged"
                onClick={() => {
                  tabChange("flag");
                }}
              />
            </Tabs>
          </TabContext>
        </ThemeProvider>
      </div>
      <Grid item sm={12} xs={12} md={12}>
        <div className={style.tbldiv}>
          <div className={style.pendinguser}>
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                borderRadius: "20px",
                boxShadow: "none",
              }}
            >
              <TableContainer sx={{ padding: "0px 21px" }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  style={{ borderSpacing: "0px 10px" }}
                  id="mytable"
                >
                  <TableHead style={{ position: "stickey" }}>
                    <TableRow className={style.theadrow}>
                      <TableCell className={style.theadrowtxt}>
                        Username
                      </TableCell>
                      <TableCell className={style.theadrowtxt}>
                        Review
                      </TableCell>
                      <TableCell className={style.theadrowtxt}>
                        Comment
                      </TableCell>
                      <TableCell
                        className={style.theadrowtxt}
                        style={{ textAlign: "center" }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <>
                            <TableRow
                              className={style.tbodyrow}
                              key={row.name}
                              style={{ border: "5px solid black" }}
                              id="tablerow"
                            >
                              <TableCell id={style.tfcell} key={row.name}>
                                <div className={style.tableuserdiv}>
                                  <div className={style.imageuser}>
                                    <div className={style.bgpicdiv}>
                                      <Avatar
                                        src={
                                          !!row.name.sendpic
                                            ? row.name.sendpic
                                            : ""
                                        }
                                        className={style.bigpic}
                                        onClick={(event) =>
                                          handleClickOpen(
                                            event.target,
                                            console.log(userId, "rowid"),
                                            setUserid(row),
                                            setRowname(row.name),
                                            setReviewrow(row.review)
                                          )
                                        }
                                      ></Avatar>
                                    </div>
                                    <div className={style.smlpicdiv}>
                                      <Avatar
                                        src={
                                          !!row.name.profilphoto
                                            ? row.name.profilphoto
                                            : ""
                                        }
                                        className={style.smlpic}
                                        onClick={(click) =>
                                          handle2ndClickOpen(
                                            click.target,
                                            setRowstatus(row.status)
                                          )
                                        }
                                      ></Avatar>
                                    </div>
                                  </div>
                                  <div className={style.spandiv}>
                                    <Typography
                                      variant="body1"
                                      id={style.spanname}
                                      className="fullname"
                                    >
                                      {" "}
                                      {row.name.myname} {row.name.mylast}{" "}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      id={style.spantime}
                                    >
                                      {" "}
                                      {row.name.time}
                                    </Typography>
                                    <ArrowForwardRoundedIcon
                                      className={style.arrow}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell id={style.tcell} key={row.review}>
                                <div className={style.rewiewcls}>
                                  <div className={style.reviewtxt}>
                                    <div className={style.review}>
                                      <Typography variant="body1">
                                        {row.review.text1}
                                      </Typography>
                                      <Typography variant="body1">
                                        {" "}
                                        <Rating
                                          readOnly
                                          name="size-medium"
                                          precision = {0.5}
                                          defaultValue={row.review.rat1}
                                          className={style.myrating}
                                        />{" "}
                                      </Typography>
                                    </div>
                                    <div className={style.review}>
                                      <Typography variant="body1">
                                        {row.review.text2}
                                      </Typography>
                                      <Typography variant="body1">
                                        {" "}
                                        <Rating
                                          readOnly
                                          name="size-medium"
                                          precision = {0.5}
                                          defaultValue={row.review.rat2}
                                          className={style.myrating}
                                        />{" "}
                                      </Typography>
                                    </div>
                                    <div className={style.review}>
                                      <Typography variant="body1">
                                        {row.review.text3}
                                      </Typography>
                                      <Typography variant="body1">
                                        {" "}
                                        <Rating
                                          readOnly
                                          name="size-medium"
                                          precision = {0.5}
                                          defaultValue={row.review.rat3}
                                          className={style.myrating}
                                        />{" "}
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell id={style.tcell} key={row.comment}>
                                <div className={style.commenttext}>
                                  <Typography variant="body2">
                                    {" "}
                                    {row.comment}{" "}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell id={style.tlcell} key={row.status}>
                                <div className={style.statusbtn}>
                                  {
                                    // console.log(row.status,'ppppemnw'),
                                    row.status == "pending" ? (
                                      <>
                                        <Button
                                          variant="contained"
                                          value={row.id}
                                          className={style.acpt}
                                          id={style.status}
                                          onClick={(e) => {
                                            myreviewUpdate(
                                              e.target.value,
                                              "approve"
                                            );
                                          }}
                                        >
                                          {" "}
                                          Approve
                                        </Button>
                                        <Button
                                          variant="contained"
                                          value={row.id}
                                          className={style.rgct}
                                          id={style.status}
                                          onClick={(e) => {
                                            myreviewUpdate(
                                              e.target.value,
                                              "reject"
                                            );
                                          }}
                                        >
                                          {" "}
                                          Reject
                                        </Button>
                                        <Button
                                          variant="contained"
                                          value={row.id}
                                          className={style.flag}
                                          id={style.status}
                                          onClick={(e) => {
                                            myreviewUpdate(
                                              e.target.value,
                                              "flag"
                                            );
                                          }}
                                        >
                                          {" "}
                                          Flag{" "}
                                        </Button>
                                      </>
                                    ) : row.status == "approve" ? (
                                      <>
                                        <Button
                                          variant="contained"
                                          value={row.id}
                                          className={style.remv}
                                          id={style.status}
                                        >
                                          {" "}
                                          Remove{" "}
                                        </Button>
                                      </>
                                    ) : row.status == "reject" ? (
                                      <>
                                        <Typography
                                          variant="p"
                                          className={style.rjcttxt}
                                        >
                                          {" "}
                                          Rejected{" "}
                                        </Typography>
                                      </>
                                    ) : row.status == "flag" ? (
                                      <>
                                        <Typography
                                          variant="p"
                                          className={style.rjcttxt}
                                        >
                                          {" "}
                                          Flagged{" "}
                                        </Typography>
                                      </>
                                    ) : (
                                      ""
                                    )
                                  }
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[4, 10, 25, 100]}
                component="div"
                className={style.pagination}
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </Grid>
    </>
  );
}
