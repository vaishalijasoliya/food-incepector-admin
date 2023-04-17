import * as React from "react";
import { Box, IconButton, Table, TableBody, TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styles from "../../styles/user/paymenttable.module.css";
import Paper from "@mui/material/Paper";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import { categoryData } from "../Utils/data";
import { DeleteIcon_, Editicon } from "../Utils/icons";

const EnhancedTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [categoryList, setCategoryList] = React.useState([]);
  const [categorySearch, setCategorySearch] = React.useState([]);

  React.useEffect(() => {
    setCategorySearch(categoryData);
    setCategoryList(categoryData);
  }, []);

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Grid container>
      <Grid container>
        <Grid item xs={12} md={12}>
          <div>
            <Box sx={{ width: "100%" }}>
              <Paper
                sx={{ width: "100%", mb: 2 }}
                className={styles.maentebal2}
              >
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                  >
                    {" "}
                    <TableHead>
                      <TableRow>
                        <TableCell className={styles.addnmejdhd}>
                          Name
                        </TableCell>
                        <TableCell
                          style={{
                            textAlign: "right",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? categoryList.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : categoryList
                      ).map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="content_end">
                              {" "}
                              <Box
                                style={{ display: "flex", columnGap: "20px" }}
                              >
                                <IconButton>
                                  <DeleteIcon_ height={15} width={15} />
                                </IconButton>
                                <IconButton>
                                  <Editicon height={15} width={15} />
                                </IconButton>
                              </Box>
                            </TableCell>
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
                  count={categoryList.length}
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

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
