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
  const { rows, headCells, isLoaded, tableRef } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100, { label: 'All', value: 9999999 }]} // Add the "All" option
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
