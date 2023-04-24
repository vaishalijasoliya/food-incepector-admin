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
import moment from "moment";
import DownloadIcon from "@mui/icons-material/Download";
import { useRouter } from "next/router";

export const TableComponent = ({
  data,
  rowsPerPage,
  page,
  Header,
  handleClickOpenTWO,
  handleOpen_delete,
  tokenObj
}) => {
  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch("SamplePDF.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf";
        alink.click();
      });
    });
  };
  const router = useRouter();
  var currentPath = router.pathname;
  const quspage = (item) => {
    console.log(item, "item__");
    router.push({ pathname: "/all_qus_list", query: { id: item } });
    
  };

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
            console.log(item, "item__");

            return (
              <TableRow
                className={currentPath == "./audit.js" ? Style.active : ""}
                key={index}
              >
                <TableCell
                  onClick={() => {
                    // console.log(id,"tokenObj__")
                    quspage(item.id);
                  }}
                >
                  {item.location_location}
                </TableCell>
                <TableCell onClick={quspage}>
                  {moment(item.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell onClick={quspage}>678</TableCell>
                <TableCell onClick={quspage}>{item.location_name}</TableCell>
                <TableCell>
                  <button onClick={onButtonClick}>
                    <DownloadIcon />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
