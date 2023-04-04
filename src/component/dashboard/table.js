import React, { useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import { Grid } from "@mui/material";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import TableRow from "@mui/material/TableRow";
import style from "../../styles/dashboard.module.css";
import { Avatar, Button, Rating, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { array, object, string } from "yup";
import moment from "moment";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function createData(
  name = string,
  code = string,
  population = number,
  size = number
) {
  return { name, code, population, size };
}

export default function StickyHeadTable(props) {
  const router = useRouter();

  console.log(props, "myprops11");

  const [supportListData, setSupportListData] = React.useState([]);
  const [reviewUpdate, setReviewUpdate] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (!!props.props.props.profile && !!props.props.props.profile.token) {
      reviewViewuser();
    }
  }, []);

  const handleClick = (id = string, data = object) => {
    reviewViewuser();
    // myreviewUpdate()
  };

  const reviewViewuser = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.props.profile.token,
    };
    var body = {
      status: "pending",
    };
    props.props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_REVIEW_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.props.loaderRef(false);

    console.log(data, "111data");
    if (!!data) {
      if (data.status == true) {
        // console.log(data.status, 'ssstatuss')
        const arr = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];

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
          arr.push(obj);
        }
        console.log(arr, "array");
        setRows(arr);
      }
    }
  };

  const myreviewUpdate = async (id, status) => {
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

    console.log(mydata, "mydataa1");
    if (!!mydata) {
      if (!!mydata.status == true) {
        reviewViewuser();
        toast.success(mydata.message);
      }
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={style.pendinguser}>
      <Grid container display={"flex"} flexWrap="wrap">
        <Grid item xs={12} md={6}>
          <div className={style.pndngusrtxt}>
            <Typography variant="body1">Pending User Review</Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
        >
          {/* <div
            className={style.viewalltxt}
            onClick={() => {
              router.push("./review");
            }}
          >
            {" "}
            <Button>View all</Button>{" "}
          </div> */}
          {/* onClick={() => { router.push('./review') }} */}
        </Grid>
      </Grid>
      <Paper
        sx={{
          width: "100%",
          overflow: "auto",
          borderRadius: "20px",
          boxShadow: "none",
        }}
        className={style.paperdiv}
      >
        <TableContainer sx={{ maxHeight: "700px" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ borderSpacing: "0px 8px" }}
          >
            <TableHead style={{ position: "stickey" }}>
              <TableRow className={style.theadrow}>
                <TableCell className={style.theadrowtxt}>Username</TableCell>
                <TableCell className={style.theadrowtxt}>Review</TableCell>
                <TableCell className={style.theadrowtxt}>Comment</TableCell>
                <TableCell
                  className={style.theadrowtxt}
                  style={{ textAlign: "center", padding: "0px" }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      className={style.tbodyrow}
                      key={row.name}
                      style={{ border: "5px solid black" }}
                    >
                      <TableCell id={style.tfcell} key={row.name}>
                        <div className={style.tableuserdiv}>
                          <div className={style.imageuser}>
                            <div className={style.bgpicdiv}>
                              <Avatar
                                src={
                                  !!row.name.sendpic ? row.name.sendpic : "m"
                                }
                                className={style.bigpic}
                              />
                            </div>
                            <div className={style.smlpicdiv}>
                              <Avatar
                                src={
                                  !!row.name.profilphoto
                                    ? row.name.profilphoto
                                    : "M"
                                }
                                className={style.smlpic}
                              />
                            </div>
                          </div>
                          <div className={style.spandiv}>
                            <Typography variant="body1" id={style.spanname}>
                              {" "}
                              {row.name.myname} {row.name.mylast}{" "}
                            </Typography>
                            <Typography variant="body2" id={style.spantime}>
                              {" "}
                              {row.name.time}
                            </Typography>
                            <ArrowForwardRoundedIcon className={style.arrow} />
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
                                  precision={0.5}
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
                                  precision={0.5}
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
                                  precision={0.5}
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
                          {row.status == "pending" ? (
                            <>
                              <Button
                                variant="contained"
                                value={row.id}
                                className={style.acpt}
                                id={style.status}
                                onClick={(e) => {
                                  myreviewUpdate(e.target.value, "approve");
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
                                  myreviewUpdate(e.target.value, "reject");
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
                                  myreviewUpdate(e.target.value, "flag");
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
                                onClick={(e) => {
                                  myreviewUpdate(e.target.value, "remove");
                                }}
                              >
                                {" "}
                                Remove{" "}
                              </Button>
                            </>
                          ) : row.status == "reject" ? (
                            <>
                              <Typography variant="p" className={style.rjcttxt}>
                                {" "}
                                Rejected{" "}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography variant="p" className={style.rjcttxt}>
                                {" "}
                                Flagged{" "}
                              </Typography>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
