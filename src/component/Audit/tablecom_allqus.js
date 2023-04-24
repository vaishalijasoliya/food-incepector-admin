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

export const TableComponent = ({
  data,
  rowsPerPage,
  page,
  Header,
  handleClickOpenTWO,
  handleOpen_delete,
}) => {
 

  console.log('data', data)

  const router = useRouter();
  var currentPath = router.pathname;
  const quspage = () => {
    router.push("./all_qus_list");
  };

  // for (let index = 0; index < item.questionList.length; index++) {
  //   const element = array[index];
    
  // }

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
                        className={currentPath == "./audit.js" ? Style.active : ""}
                        key={index}
                      
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{ quetion.name}</TableCell>
                        <TableCell>
                          <Box className={Style.last_td}>
                            <Image
                              src={'https://casablancahse.s3.me-central-1.amazonaws.com/7cc35c43e8ab2ad06d3aa2b00.jpg'}
                              //src={quetion.itemList[0]}
                              alt="picture"
                              width={50}
                              height={45}
                            />
                            <Image
                              src={'https://casablancahse.s3.me-central-1.amazonaws.com/7cc35c43e8ab2ad06d3aa2b00.jpg'}
                              // src={item.itemList}
                              alt="picture"
                              width={50}
                              height={45}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>{item.compliance}</TableCell>
                        <TableCell>{item.observation}</TableCell>
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
