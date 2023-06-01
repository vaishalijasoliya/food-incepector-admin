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
import React from "react";
import { DeleteIcon_, Editicon } from "../Utils/icons";
import Style from "./subadmin.module.css";
export const TableComponent = ({
  data,
  rowsPerPage,
  page,
  Header,
  handleClickOpenTWO,
  handleOpen_delete,
  setAuditorDetails,
  onViewEditor,
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            {Header.map((item, index) => {
              return (
                <TableCell
                  key={item.id}
                  //   align="left"
                  className={Style.table_cell}
                >
                  {item.name}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((item, index) => {
            return (
              <TableRow className={Style.table_row} key={index}>
                <TableCell>{item.name}</TableCell>
                
                <TableCell>{item.user_name}</TableCell>
                <TableCell>
                  <Box className={Style.last_td}>
                    <IconButton
                      className={Style.icon_btn}
                      onClick={() => {
                        handleClickOpenTWO();
                        onViewEditor({ id_user: item.id });
                        setAuditorDetails(item);
                      }}
                    >
                      
                      <Editicon height={15} width={15} />
                    </IconButton>
                    {item.status == "active" ? (
                      <IconButton
                        className={Style.icon_btn}
                        onClick={() => {
                          handleOpen_delete();
                          setAuditorDetails(item);
                        }}
                      >
                        <DeleteIcon_ height={15} width={15} />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
