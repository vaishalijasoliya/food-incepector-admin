import React from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Style from "../Auditor/auditor.module.css";
import moment from "moment";

export const Dashtablecomponent = ({
  data,
  rowsPerPage,
  page,
  Header,
  handleClickOpenTWO,
  handleOpen_delete,
  tokenObj,
}) => {


  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow className={Style.TableRow}>
            {Header.map((item, index) => {
              return (
                <TableCell key={item.id} className={Style.table_cell}>
                  {item.name}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? categoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : categoryList
          ).map((item, index) => {
            console.log(item, "item__");

            return (
              <TableRow
                className={currentPath == "./dashboard" ? Style.active : ""}
                key={index}
              >
                <TableCell className={Style.table_cell}>
                  {item.location_name}
                </TableCell>
                <TableCell className={Style.table_cell}>
                  {item.location_head_staff}
                </TableCell>
                <TableCell className={Style.table_cell}>
                  {moment(item.createdAt).format("DD/MM/YYYY")}
                  {item.location_timing}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
