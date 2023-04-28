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
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

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

  // const Controls = ({ zoomIn, zoomOut, resetTransform }) => (
  //   <>
  //     <button onClick={() => zoomIn()}>+</button>
  //     <button onClick={() => zoomOut()}>-</button>
  //     <button onClick={() => resetTransform()}>x</button>
  //   </>
  // );
  // const Component = () => {
  //   const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  // const zoomToImage = () => {
  //   if (transformComponentRef.current) {
  //     const { zoomToElement } = transformComponentRef.current;
  //     zoomToElement("imgExample");
  //   }
  // };

  return (
    <TableContainer>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        key={1}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                <Box className={"Input_box"}>
                  <DialogTitle className={styles.addtitalaja}>
                    Image
                  </DialogTitle>
                  <Image
                    onClick={handleClickOpen}
                    src={image1}
                    // src={quetion.itemList}
                    alt="picture"
                    width={550}
                    height={350}
                  />
                  {/* <TransformWrapper
                    initialScale={1}
                    initialPositionX={200}
                    initialPositionY={100}
                    ref={transformComponentRef}
                  >
                    {(utils) => (
                      <React.Fragment>
                        <Controls {...utils} />
                        <TransformComponent>
                          <img src="image.jpg" alt="test" id="imgExample" />
                          <div onClick={zoomToImage}>Example text</div>
                        </TransformComponent>
                      </React.Fragment>
                    )}
                  </TransformWrapper> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open2}
        onClose={handleClose2}
        key={1}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box className={styles.dialog_box} style={{ paddingTop: 0 }}>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={12} sm={12} lg={12} xl={12} md={12}>
                <Box className={"Input_box"}>
                  <DialogTitle className={styles.addtitalaja}>
                    Image
                  </DialogTitle>
                  <Image
                    onClick={handleClickOpen2}
                    src={image2}
                    // src={quetion.itemList}
                    alt="picture"
                    width={550}
                    height={350}
                  />
                  <div>
                    <button onClick={() => zoomIn()}>+</button>
                    <button onClick={() => zoomOut()}>-</button>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
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
                  console.log(quetion, quetion, "quetion");

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
                          <Image
                            onClick={handleClickOpen}
                            src={image1}
                            // src={quetion.itemList}
                            alt="picture"
                            width={50}
                            height={45}
                          />

                          <Image
                            onClick={handleClickOpen2}
                            src={image2}
                            // src={quetion.itemList}
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
