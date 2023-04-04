import { TablePagination } from "@mui/material";
import React from "react";
import Styles from "../../styles/mainstyles.module.css";

export const Table_Pagination = ({
  dataCount,

  handleChangePage,
  handleChangeRowsPerPage,
  PageOptions,
  rowsPerPage,
  Page,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={PageOptions}
      component="div"
      className={Styles.Pagination__style}
      count={dataCount}
      rowsPerPage={rowsPerPage}
      page={Page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
