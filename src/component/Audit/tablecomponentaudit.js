import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton
} from "@mui/material";
import React from "react";
import Style from "../Auditor/auditor.module.css";
import moment from "moment";
import DownloadIcon from "@mui/icons-material/Download";
import { useRouter } from "next/router";
import { DeleteIcon_ } from "../Utils/icons";

export const TableComponent = ({
  data,
  rowsPerPage,
  page,
  Header,
  handleClickOpenTWO,
  handleOpen_delete,
  setAuditorDetails,
  tokenObj,
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

            const finalRating =
              (item.audit_score_data * 100) / item.audit_score_total;

            console.log(
              item.audit_score_data / item.audit_score_total,
              "is____new__Check__item",
              finalRating.toFixed(2),
              (finalRating * 5) / 100,
              item.audit_score
            );

            const giveGrade = (number) => {
              const amuont = number;
              const toconvertFive = (amuont * 5) / 100;
              if (toconvertFive >= 4.5) {
                return `(${amuont.toFixed(2)}%) Very good`;
              } else if (toconvertFive <= 4.4 && toconvertFive >= 4.0) {
                return `(${amuont.toFixed(2)}%) good`;
              } else if (toconvertFive <= 3.9 && toconvertFive >= 3.5) {
                return `(${amuont.toFixed(2)}%) Average`;
              } else if (toconvertFive <= 3.4) {
                return `(${amuont.toFixed(2)}%) Below Average`;
              }
            };

            // const ansInper =

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
                <TableCell className={Style.table_cell}>
                  {item.audit_start}
                </TableCell>
                <TableCell className={Style.table_cell}>
                  {item.audit_time}
                </TableCell>
                <TableCell className={Style.table_cell}>
                  <Typography> {item.gps_location}</Typography>
                </TableCell>
                <TableCell className={Style.table_cell}>
                  {item.user.name}
                </TableCell>
                <TableCell className={Style.table_cell}>
                  <img src={item.audit_selfi} width={99} height={99} />
                </TableCell>
                {/* <TableCell
                  className={Style.table_cell}
                  onClick={() => {
                    quspage(item.id);
                  }}
                >
                  {item.createdAt}
                </TableCell> */}
                <TableCell
                  className={Style.table_cell}
                // onClick={() => {
                //   quspage(item.id);
                // }}
                >
                  {`${item.audit_score_data}/${item.audit_score_total}  (${item.audit_score}%) (${item.audit_grade})`}
                </TableCell>
                {/* <TableCell
                  className={Style.table_cell}
                  onClick={() => {
                    quspage(item.id);
                  }}>{item.location_name}</TableCell> */}
                <TableCell>
                  {/* <button  className={Style.table_cell}> */}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.pdfUrl}
                    download
                  >
                    <DownloadIcon />
                  </a>
                  {/* <DownloadIcon /> */}
                  {/* </button> */}
                </TableCell>
                <TableCell>
                  <IconButton
                    className={Style.icon_btn}
                    onClick={() => {
                      handleOpen_delete();
                      setAuditorDetails(item);
                    }}
                  >
                    <DeleteIcon_ height={15} width={15} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
