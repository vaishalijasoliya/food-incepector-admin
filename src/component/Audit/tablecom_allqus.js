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


export const TableComponent = ({
  data,
  rowsPerPage,
  page,
  Header,
  handleClickOpenTWO,
  handleOpen_delete,
  loaderref
}) => {
 

  console.log('data', data)

  const router = useRouter();
  var currentPath = router.pathname;
  const quspage = () => {
    router.push("./audit");
  
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
            
          ).map(
            (item, index) => {
            console.log(item, item, 'quetion')
            return (
              <>
                {item.questionList.map((quetion, index1) => {
                  console.log(quetion, quetion, 'quetion')

                    return (
                      
                      <TableRow
                        onClick={quspage}
                        className={currentPath == "/audit" ? Style.active : ""}
                        key={index}                      
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{quetion.name}</TableCell>
                        <TableCell>
                          <Box className={Style.last_td}>
                            <Image
                              src={image1}
                              // src={quetion.itemList}
                              alt="picture"
                              width={50}
                              height={45}
                            />
                            <Image
                              src={image2}
                              // src={quetion.itemList}
                              alt="picture"
                              width={50}
                              height={45}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>{ quetion.compliance}</TableCell>
                        <TableCell>{quetion.observation}</TableCell>
                      </TableRow>

                    )
                  })}
              </>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
