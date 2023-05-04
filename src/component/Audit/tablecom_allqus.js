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
  Dialog,
  DialogTitle,
  TextField,
  Zoom,
} from "@mui/material";
import React from "react";
import Style from "../Auditor/auditor.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import image1 from "../../../public/image/imgsmall.png";
import image2 from "../../../public/image/imgsmall2.png";
import Grid from "@mui/material/Grid";
import { InputLable } from "../../Layout/inputlable";
import { Input_error } from "../Utils/string";
import { Button_ } from "../../Layout/buttons";
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
  handleClickOpenTWO,
  handleOpen_delete,
  loaderref,
}) => {
  console.log("data", data);

  const router = useRouter();
  var currentPath = router.pathname;
  // const quspage = () => {
  //   router.push("./audit");
  // };

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    formik.resetForm();
  };

  const onAddCategory = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {
      name: formik.values.name,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADD_CATEGORY,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    if (data) {
      if (data.status) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(Error_msg.NOT_RES);
    }
    getCategoryList();
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
    }),
    onSubmit: (values) => {
      if (open == true) {
        onAddCategory();
      } else if (openEdit == true) {
        onEditCategory();
      }
      formik.resetForm();
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };


const popupimageurl = "/image/imgsmall.png"
const popupimageurl2 = "/image/imgsmall2.png"


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
              <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
           
                  {/* <Image
                    onClick={handleClickOpen}
                    src={image1}
                    // src={quetion.itemList}
                    alt="picture"
                    width={550}
                    height={350}
                  /> */}
                <Grid container justifyContent={"space-between"}>
                <Lightbox 
                image="https://casablancahse.s3.me-central-1.amazonaws.com/7cc35c43e8ab2ad06d3aa2b00.jpg" className={Style.lightbox_img} onClose={null} title="Image Title" maxWidth="67vw" height="1000px" alt="image"/>            
                </Grid>
                   
              </Grid>
            </Grid>

      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open2}
        onClose={handleClose2}
        key={1}
        className={Style.dialog}
      >
        
            <Grid container justifyContent={"space-between"}>
                <Lightbox 
                image="https://casablancahse.s3.me-central-1.amazonaws.com/7cc35c43e8ab2ad06d3aa2b02.jpg" onClose={null} title="Image Title" width='1120px' height="1000px" alt="image"/>            
            </Grid>

    
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
                  console.log(quetion.itemList[0],  "quetion");
                  console.log(item,  "item___");


                  return (
                    <TableRow
                      // onClick={quspage}
                      className={
                        currentPath == "/all_qus_list" ? Style.active : ""
                      }
                      key={index}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{quetion.name}</TableCell>
                      <TableCell>
                        <Box className={Style.last_td}>
                          <img
                            onClick={handleClickOpen}
                            src={quetion.itemList[0]}
                            alt="picture"
                            width={50}
                            height={45}
                          />

                          <img
                            onClick={handleClickOpen2}
                            src={quetion.itemList[1]}
                            alt="picture"
                            width={50}
                            height={45}
                          />

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
