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
import image1 from "../../../public/image/imgsmall.png" 
import image2 from "../../../public/image/imgsmall2.png" 
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export const TableComponent = ({
  data,
  rowsPerPage,
  page,
  Header,
  handleClickOpenTWO,
  handleOpen_delete,
  loaderref,
}) => {
 

  console.log('data', data)

  const router = useRouter();
  var currentPath = router.pathname;
  // const quspage = () => {
  //   router.push("./audit");
  // };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  
  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const open2 = Boolean(anchorE2);
  const id2 = open ? 'simple-popover' : undefined;


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
                {item.questionList.map((quetion, index1) => {
                  console.log(quetion, quetion, 'quetion')

                    return (
                      
                      <TableRow
                        // onClick={quspage}
                        className={currentPath == "/all_qus_list" ? Style.active : ""}
                        key={index}                      
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{quetion.name}</TableCell>
                        <TableCell>
                          <Box className={Style.last_td}>
                            <Image onClick={handleClick}
                            className={Style.img1}
                            aria-describedby={id}
                            variant="contained"
                              src={image1}
                              // src={quetion.itemList}
                              alt="picture"
                              width={50}
                              height={45}
                            />

                            <Popover className={Style.popup_box}
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                  >
                                    <Image onClick={handleClick}
                                                        aria-describedby={id}
                                                        variant="contained"
                                                          src={image1}
                                                          // src={quetion.itemList}
                                                          alt="picture"
                                                          width={250}
                                                          height={245}
                                                        />
                            </Popover>




                            <Image
                            onClick={handleClick2}
                            className={Style.img1}
                            aria-describedby={id2}
                            variant="contained"
                              src={image2}
                              // src={quetion.itemList}
                              alt="picture"
                              width={50}
                              height={45}
                            />
                             <Popover className={Style.popup_box}
                                    id={id2}
                                    open={open2}
                                    anchorEl={anchorE2}
                                    onClose={handleClose2}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                  >
                                    <Image onClick={handleClick2}
                                        aria-describedby={id2}
                                        variant="contained"
                                        src={image2}
                                        // src={quetion.itemList}
                                        alt="picture"
                                        width={250}
                                        height={245}
                                        />
                            </Popover>
                          </Box>
                        </TableCell>
                        <TableCell>{ quetion.compliance}</TableCell>
                        <TableCell>{quetion.observation}</TableCell>
                      </TableRow>

                    )
                  })}
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
