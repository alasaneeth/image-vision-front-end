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

export default function BasicTable(props) {
  const { rows, headCells, bodyCells, isLoaded, tableRef } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper >
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table" id="table-to-xls" ref={tableRef}>
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
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    {headCells.map((head, index) => (
                      <TableCell
                        key={index}
                        align={head.align}
                        component="th"
                        scope="row"
                      >
                        {head.key(row)
                          ? head.currency
                            ? currency(head.key(row))
                            : head.key(row)
                          : "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>

        {parseFloat(bodyCells.tatal) > 0 && (
          <Table size="small" aria-label="simple table" id="table-to-xls" ref={tableRef}>
            <TableHead style={{ backgroundColor: "#eee", height: 30 }}>
              <TableRow>
                <TableCell>Cash Payment</TableCell>
                <TableCell>Cheque Payment</TableCell>
                <TableCell>Card Payment</TableCell>
                <TableCell>Bank Amount</TableCell>
                <TableCell>Return Amount</TableCell>
                <TableCell style={{ fontWeight: "bold", backgroundColor: "#cacaca", height: 30 }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{bodyCells.cashPay ? currency(bodyCells.cashPay) : "0.00"}</TableCell>
                <TableCell>{bodyCells.chequePay ? currency(bodyCells.chequePay) : "0.00"}</TableCell>
                <TableCell>{bodyCells.cardPay ? currency(bodyCells.cardPay) : "0.00"}</TableCell>
                <TableCell>{bodyCells.bankDeposit ? currency(bodyCells.bankDeposit) : "0.00"}</TableCell>
                <TableCell>{bodyCells.returnReceipt ? currency(bodyCells.returnReceipt) : "0.00"}</TableCell>
                <TableCell>{bodyCells.tatal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}




      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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
