import * as React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TablePagination,
} from "@mui/material";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import styles from "../../styles/user/paymenttable.module.css";
import Style from "./question.module.css";
import { questionData } from "../Utils/data";

const Questions_page = (props) => {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [saesData, setSaesData] = React.useState("");
  const [questionData_, setQuestionData] = React.useState([]);
  const [questionSearch, setQuestionSearch] = React.useState([]);

  React.useEffect(() => {
    setQuestionSearch(questionData);
    setQuestionData(questionData);
  }, []);

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Head = [
    { id: 1, name: "Name" },
    { id: 2, name: "category" },
  ];

  const onSearch = (e) => {
    var value_ = e.target.value;
    if (typeof value_ !== "object") {
      if (!value_ || value_ == "") {
        setQuestionData(questionSearch);
      } else {
        var filteredData = questionSearch.filter((item) => {
          let searchValue = item.name.toLowerCase();
          return searchValue.includes(value_.toString().toLowerCase());
        });
        setQuestionData(filteredData);
      }
    }
  };

  return (
    <Grid container>
      <Grid container display={"flex"} className={styles.hadpeg}>
        <Grid className={styles.inputbox} item xs={12} md={3}>
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
        </Grid>
      </Grid>
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
                    {" "}
                    <TableHead>
                      <TableRow>
                        {Head.map((item) => {
                          return (
                            <TableCell
                              key={item.id}
                              className={Style.table_head_cell}
                              style={{
                                textAlign:
                                  item.name == "category" ? "left" : "left",
                              }}
                            >
                              {item.name}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? questionData_.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : questionData_
                      ).map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.company}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[7, 10, 25, 100]}
                  component="div"
                  className={styles.bakgvcal}
                  count={questionData_.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Box>
          </div>
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Questions_page);
