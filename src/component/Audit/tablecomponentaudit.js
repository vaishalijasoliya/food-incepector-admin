import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
  // const onButtonClick = (url,id) => {
  //   console.log(url ,id, 'usrrrr')
  //   // using Java Script method to get PDF file
  //   // fetch("SamplePDF.pdf").then((response) => {
  //   //   response.blob().then((blob) => {
  //   //     // Creating new object of PDF file
  //   //     const fileURL = window.URL.createObjectURL(blob);
  //   //     // Setting various property values
  //   //     let alink = document.createElement("a");
  //   //     alink.href = fileURL;
  //   //     alink.download = "SamplePDF.pdf";
  //   //     alink.click();
  //   //   });
  //   // });
  // };
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
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((item, index) => {
            console.log(item.audit_selfi, "item__");

            return (
              <TableRow
                className={currentPath == "./audit.js" ? Style.active : ""}
                key={index}
              >
                <TableCell
                  className={Style.table_cell}
                  onClick={() => {
                    quspage(item.id);

                  }}
                >
                  {item.location_name}
                </TableCell>
                <TableCell
                  className={Style.table_cell}>
                  {/* {moment(item.audit_start).zone('+0100').format('DD/MM/YYYY h:mm A')} */}
                  {moment(item.audit_start).format("DD/MM/YYYY h:mm A")}
                </TableCell>
                <TableCell
                  className={Style.table_cell}>
                  {item.audit_time}
                </TableCell>
                <TableCell
                  className={Style.table_cell}>
                  <Typography> {item.gps_location}</Typography>
                </TableCell>
                <TableCell
                  className={Style.table_cell}>
                  {item.user.name}
                </TableCell>
                <TableCell className={Style.table_cell}>
                  <img src={item.audit_selfi} width={99} height={99} />
                </TableCell>
                {/* <TableCell
                  className={Style.table_cell}
                  onClick={() => {
                    quspage(item.id);
                  }} >
                  {moment(item.createdAt).format("DD/MM/YYYY h:mm A")}
                </TableCell> */}
                <TableCell
                  className={Style.table_cell}
                  onClick={() => {
                    quspage(item.id);
                  }}>
                  {item.audit_score >= 4.5 ?
                    `${item.audit_score}/5  (${item.audit_score*100/5}%) (Very Good)`
                    : item.audit_score < 4.5 && item.audit_score > 3.9 ?
                    `${item.audit_score}/5 (${item.audit_score*100/5}%) (Good)`
                      : item.audit_score < 4 && item.audit_score > 3.4 ?
                      `${item.audit_score}/5 (${item.audit_score*100/5}%) (Average)`
                       : `${item.audit_score}/5  (${item.audit_score*100/5}%) (Below Average)`
                  }

                </TableCell>
                {/* <TableCell
                  className={Style.table_cell}
                  onClick={() => {
                    quspage(item.id);
                  }}>{item.location_name}</TableCell> */}
                <TableCell>
                  {/* <button  className={Style.table_cell}> */}
                  <a target="_blank" rel="noopener noreferrer" href={item.pdfUrl} download><DownloadIcon /></a>
                  {/* <DownloadIcon /> */}
                  {/* </button> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
