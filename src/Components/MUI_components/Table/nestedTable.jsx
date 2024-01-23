import {
  Box,
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
  const { rows, headCells, isLoaded, ChildHeadCells, ChildObjectName, ShiblingHeadCell, shiblingRows, tableRef, summery } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
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
                            <TableRow>
                              {row[ChildObjectName]?.length > 0 && ChildHeadCells.map((head, index) => (
                                <TableCell key={index} align={head.align}>
                                  {head.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row[ChildObjectName]?.map((elemt, index) => (
                              <TableRow>
                                {ChildHeadCells.map((head, i) => (
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
                  </React.Fragment>
                ))
            )}
          </TableBody>
        </Table>
        {shiblingRows?.length > 0 && (

          <Table size="small" aria-label="simple table" id="table-to-xls" ref={tableRef}>
            <TableHead style={{ backgroundColor: "#eee", height: 60 }}>
              <TableRow>

                {ShiblingHeadCell?.map((head, index) => (
                  <TableCell key={index} align={head.align}>
                    {head.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                shiblingRows?.length > 0 && (
                  <TableRow key={0}>
                    {ShiblingHeadCell?.map((head, index) => (
                      <TableCell
                        key={index}
                        align={head.align}
                        component="th"
                        scope="row"
                      >
                        {head.key(shiblingRows[0])
                          ? head.currency
                            ? currency(head.key(shiblingRows[0]))
                            : head.key(shiblingRows[0])
                          : "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              }
            </TableBody>

          </Table>
        )}
      </TableContainer>
      <Box style={{ margin: 10 }}>
        {rows.length === 0 ? "" :
          summery &&
          <div>
            No of Invoice: {summery.numberOfInvoice}<br />
            Invoice Total: {currency(summery.invoiceTotal)}<br />
            Disscount Total: {currency(summery.discountTotal)}<br />
            Paid Total : {currency(summery.paidTotal)}<br />
            Outsatanding : {currency(parseFloat(summery.totalWithDiscount) - parseFloat(summery.paidTotal))}
          </div>}



      </Box>


      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}