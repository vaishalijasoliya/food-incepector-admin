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
  import Style from "../Auditor/auditor.module.css";
  import moment from "moment";
  import DownloadIcon from '@mui/icons-material/Download';
  import { useHistory } from "react-router-dom";
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
// const history = useHistory();
const coursesPage = () => {
  router.push("./all_qus_list.js")
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
                
                <TableRow 
              //   onClick={() => {
              // router.push("./all_qus_list.js");
              // }}key={myKey}
              onClick={coursesPage}  
              className={currentPath == "./audit.js" ? Style.active : ""}    
       key={index} >
                <TableCell>{item.name}</TableCell>
                
                  <TableCell>
                    {moment(item.timing).format("DD/MM/YYYY")}
                 </TableCell>
                 <TableCell>{item.score}</TableCell>
                 
                  <TableCell>{item.company}</TableCell>
                  <TableCell>
                    <button onClick={onButtonClick}>
                  <DownloadIcon/>
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
// };