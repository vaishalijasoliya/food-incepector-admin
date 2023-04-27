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
import Style from "../Auditor/auditor.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import image1 from "../../../public/image/imgsmall.png";
import image2 from "../../../public/image/imgsmall2.png";

export const TableComponent = ({
  data,
  rowsPerPage,
  page,
  Header,
  handleClickOpenTWO,
  handleOpen_delete,
  loaderref,
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
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
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((item, index) => {
            return (
              <>
                {item.questionList.map((question, index1) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{question.name}</TableCell>
                      <TableCell>
                        <Box className={Style.last_td}>
                          {question.itemList
                            ? question.itemList.map((imgsrc, index) => {
                                return (
                                  <img
                                    src={imgsrc}
                                    key={index}
                                    alt={item.name}
                                  />
                                );
                              })
                            : ""}
                        </Box>
                      </TableCell>
                      <TableCell>{question.compliance}</TableCell>
                      <TableCell>{question.observation}</TableCell>
                    </TableRow>
                  );
                })}
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
