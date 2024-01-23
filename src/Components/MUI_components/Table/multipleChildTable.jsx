import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

import { currency } from "../currencyFormatterTag";

export default function NestedTable(props) {
  const { rows, headCells, isLoaded, ChildHeadCells1, ChildObjectName1, tableRef, ChildHeadCells2, ChildObjectName2, ChildHeadCells3, ChildObjectName3, details,chequeReturnRows,paidStatus } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleChangeAllRows = () => {
    setRowsPerPage(rows.length); // Set rowsPerPage to the total number of rows
    setPage(0);
  };

  return (
    <Paper>
      {rows.length === 0 ? "" : details &&
        <div style={{ marginLeft: 10 }}>
          Customer: {details?.customername }<br />
          Credit Amout(OS) {currency(details?.creditAmount) }<br />
          Over Payment : {currency(details?.overpayment)}<br />
          Return Amount :{currency(details?.returnAmount)} {paidStatus == 0 ? ` (with Bill : ${details?.totalReturnWithBill}, without Bill: ${details?.returnAmount - details?.totalReturnWithBill})` : ""} <br />
          Cheque Return Amount: {currency(details?.chequeReturnAmount) }
        </div>}
      <TableContainer component={Paper}>

        <Table size="small" aria-label="simple table" ref={tableRef}>
          <TableHead style={{ backgroundColor: "#eee", height: 60 }}>
            <TableRow>
              <TableCell width={10}>#</TableCell>

              {headCells.map((head, index) => (
                <TableCell key={index} align={head.align}>
                  {head.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headCells.length + 2} align="center">
                  {isLoaded === true ? "Loading..." : `No item to display.`}
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={index}>
                    <TableRow style={{ backgroundColor: "#333" }}>
                      <TableCell style={{ color: "white" }}>
                        {index + 1}
                      </TableCell>
                      {headCells.map((head, index) => (
                        <TableCell
                          style={{ color: "white" }}
                          key={index}
                          align={head.align}
                          component="th"
                          scope="row"
                        >
                          {head.currency
                            ? currency(head.key(row))
                            : head.key(row)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={headCells.length + 1}>
                        <Table
                          size="small"
                          aria-label="simple table"
                          className="mb"
                        >
                          <TableHead style={{ backgroundColor: "#eeeeee70" }}>
                            {row[ChildObjectName1].length > 0 && (
                              <TableRow>
                                {ChildHeadCells1.map((head, index) => (
                                  <TableCell key={index} align={head.align}>
                                    {head.label}
                                  </TableCell>
                                ))}
                              </TableRow>
                            )}

                          </TableHead>
                          <TableBody>
                            {(row.invoice ? row.invoice[ChildObjectName1] : row[ChildObjectName1]).map((elemt, index) => (
                              <TableRow>
                                {ChildHeadCells1.map((head, i) => (
                                  <TableCell
                                    key={i}
                                    align={head.align}
                                    component="th"
                                    scope="row"
                                  >
                                    {head.currency
                                      ? currency(head.key(elemt))
                                      : head.key(elemt)}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                    {ChildHeadCells2?.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={headCells.length + 1}>
                          <Table
                            size="small"
                            aria-label="simple table"
                            className="mb"
                          >
                            <TableHead style={{ backgroundColor: "#eeeeee70" }}>
                              <TableRow>
                                {row[ChildObjectName2].length > 0 && (
                                  ChildHeadCells2?.map((head, index) => (
                                    <TableCell key={index} align={head.align}>
                                      {head.label}
                                    </TableCell>
                                  ))
                                )}

                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(row.invoice ? row.invoice[ChildObjectName2] : row[ChildObjectName2]).map((elemt, index) => (
                                <TableRow>
                                  {ChildHeadCells2.map((head, i) => (
                                    <TableCell
                                      key={i}
                                      align={head.align}
                                      component="th"
                                      scope="row"
                                    >
                                      {head.currency
                                        ? currency(head.key(elemt))
                                        : head.key(elemt)}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    )}



                  </React.Fragment>
                ))
            )}
            
          
               {ChildHeadCells3?.length > 0 && (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1}>
                    <Table
                      size="small"
                      aria-label="simple table"
                      className="mb"
                    >
                      <TableHead style={{ backgroundColor: "#eeeeee70" }}>
                     
                        <TableRow>
                          {chequeReturnRows?.length > 0 && (
                            ChildHeadCells3?.map((head, index) => (
                              <TableCell key={index} align={head.align}>
                                {head.label}
                              </TableCell>
                            ))
                          )}
  
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(chequeReturnRows)?.map((elemt, index) => (
                          <TableRow>
                            {ChildHeadCells3.map((head, i) => (
                              <TableCell
                                key={i}
                                align={head.align}
                                component="th"
                                scope="row"
                              >
                                {head.currency
                                  ? currency(head.key(elemt))
                                  : head.key(elemt)}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}       
            
            
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 9999]}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
