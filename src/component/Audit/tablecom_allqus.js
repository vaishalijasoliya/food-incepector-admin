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




  export const TableComponent = ({
    data,
    rowsPerPage,
    page,
    Header,
    handleClickOpenTWO,
    handleOpen_delete,
  }) => {


const onButtonClick = () => {
  // using Java Script method to get PDF file
  fetch('SamplePDF.pdf').then(response => {
      response.blob().then(blob => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement('a');
          alink.href = fileURL;
          alink.download = 'SamplePDF.pdf';
          alink.click();
      })
  })
}
  const router = useRouter();
  var currentPath = router.pathname;
  const quspage = () => {
    router.push("./all_qus_list")
}

    return (
      
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {Header.map((item, index) => {
                return (
                  <TableCell
                    key={item.id}
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
                
                <TableRow 
                onClick={quspage}  
                className={currentPath == "./audit.js" ? Style.active : ""}    
                key={index} >
                    <TableCell>{item.qustion}</TableCell>
                    <TableCell>
                    <Box className={Style.last_td}>
                        <IconButton
                        className={Style.icon_btn}
                        onClick={handleClickOpenTWO}
                        >
                        <img src="/image/imgsmall.png" height="40px" width="50px" alt="img" />
                        </IconButton>
                        <IconButton
                        className={Style.icon_btn}
                        onClick={handleOpen_delete}
                        >
                        <img src="/image/imgsmall2.png" height="40px" width="50px" alt="img"  />
                        </IconButton>
                    </Box>
                </TableCell>
                    <TableCell>{item.Compliance}</TableCell>
                    <TableCell>{item.observation}</TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
