import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import Styles from "./subadmin.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Subadmin_data } from "../Utils/data";
import { Input_error } from "../Utils/string";
import { InputLable } from "../../Layout/inputlable";
import { Button_ } from "../../Layout/buttons";

const Subadmin = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [open, setOpen] = React.useState(false);
  const handleChangeRowsPerPage = (event = React.ChangeEvent) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event = unknown, newPage = number) => {
    setPage(newPage);
  };
  const formik = useFormik({
    initialValues: {
      userName: "",
      name: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required."),
      password: Yup.string().required("Password is required."),
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("E-mail is required"),
    }),
    onSubmit: () => {
      formik.resetForm();
    },
  });

  const Header = [
    { id: 1, name: "Sr." },
    { id: 2, name: "Name" },
    { id: 3, name: "username" },
    { id: 4, name: "password" },
  ];

  return (
    <Box>
      <Dialog onClose={handleClose} open={open} maxWidth="sm">
        <DialogTitle className={Styles.DialogTitle_}>Add Subadmin</DialogTitle>
        
        <Box className={Styles.Dialog_box}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container className={Styles.Subadmin_main_box}>
              <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                <Box className={"Input_box"}>
                  <InputLable text={"Name"} fs={"12px"} />
                  <TextField
                    className={"Input_field"}
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <Box className={"error_text_view"}>
                    {formik.errors.name && formik.touched.name && (
                      <Input_error text={formik.errors.name} />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                <Box className={"Input_box"}>
                  <InputLable text={"Email"} fs={"12px"} />
                  <TextField
                    className={"Input_field"}
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <Box className={"error_text_view"}>
                    {formik.errors.email && formik.touched.email && (
                      <Input_error text={formik.errors.email} />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                <Box className={"Input_box"}>
                  <InputLable text={"Username"} fs={"12px"} />
                  <TextField
                    className={"Input_field"}
                    name="userName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                  />
                  <Box className={"error_text_view"}>
                    {formik.errors.userName && formik.touched.userName && (
                      <Input_error text={formik.errors.userName} />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={5.6} lg={5.6} xl={5.6} md={5.6}>
                <Box className={"Input_box"}>
                  <InputLable text={"Password"} fs={"12px"} />
                  <TextField
                    className={"Input_field"}
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Box className={"error_text_view"}>
                    {formik.errors.password && formik.touched.password && (
                      <Input_error text={formik.errors.password} />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                <Button_ text={"Create"} type="submit" />
                <Button_ text={"Cancel"} handleClick={formik.resetForm} />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
      <Box className={Styles.top_box}>
        <Button
          className={Styles.top_button}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Subadmin
        </Button>
      </Box>
      <TableContainer className={Styles.table_container}>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow className={Styles.head_row}>
              {Header.map((item, index) => {
                return (
                  <TableCell key={item.id} className={Styles.table_cell}>
                    {item.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? Subadmin_data.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : Subadmin_data
            ).map((item, index) => {
              return (
                <TableRow className={Styles.table_row} key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>{item.password}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[7, 10, 25, 100]}
                count={Subadmin_data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* {Subadmin_data.map((item ,index)=>{
        return(


        )
      })} */}
    </Box>
  );
};

export default Subadmin;
