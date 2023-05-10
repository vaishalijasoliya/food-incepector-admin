import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
} 
from "@mui/material";
import React from "react";
import Style from "../Auditor/auditor.module.css";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import styles from "../../styles/user/paymenttable.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

export const TableComponent = ({
  data,
  rowsPerPage,
  page,
  Header,
}) => {
  console.log("data", data);

  const router = useRouter();
  var currentPath = router.pathname;


  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const [openlightbox, setOpenlightbox] = React.useState(false);

  return (
    <TableContainer>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        key={1}
        className={Style.dialog}
      >
        <Grid container justifyContent={"space-between"}>
          {/* <Grid item xs={12} sm={12} lg={12} xl={12} md={12}> */}
            {/* <Grid container justifyContent={"space-between"}> */}
              <Lightbox
                open={open}
                onClose={handleClose}
                image={imageUrl}
                className={Style.lightbox_img}
                title="Image Title"
                // maxWidth="67vw"
                // height="100px"
                alt="image"
              />
            </Grid>
          {/* </Grid> */}
        {/* </Grid> */}
      </Dialog>
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
                {item.questionList.map((quetion, index1) => {
                  return (
                    <TableRow
                      className={
                        currentPath == "/all_qus_list" ? Style.active : ""
                      }
                      key={index}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{quetion.name}</TableCell>
                      <TableCell>
                        <Box className={Style.last_td}>
                        {
                          quetion.itemList[0] && 
                          <img
                            onClick={() => {
                              setImageUrl( quetion.itemList[0])
                              setOpen(true)
                            }}
                            src={quetion.itemList[0]}
                            width={50}
                            height={45}
                          />
                        }
                          
                          {
                            quetion.itemList[1] && <img
                            onClick={() => {
                              setImageUrl( quetion.itemList[1])
                              setOpen(true)
                            }}
                            src={quetion.itemList[1]}
                            width={50}
                            height={45}
                          />
                          }
                          
                        </Box>
                      </TableCell>
                      <TableCell>{quetion.compliance}</TableCell>
                      <TableCell>{quetion.observation}</TableCell>
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
// }
