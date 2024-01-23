import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { currency } from "../MUI_components/currencyFormatterTag";
import { Box } from "@mui/system";

export default function NestedReportPrintTable({
  rows,
  headCells,
  billTotal,
  lastRow,
  children,
  ChildHeadCells,
  ChildObjectName,
  shiblingRows,
  ShiblingHeadCell,
  summery
}) {
  return (
    <>
      <table className="print-table" aria-label="customized table" id="table-to-xls">
        <thead className="thead">
          <tr
            style={{
              borderBottom: "1px solid #24242450",
              backgroundColor: "#cacaca",
            }}
            className="mt"
          >
            <th width="20" align="center">
              SN
            </th>
            {headCells.map((cell, index) => (
              <th key={index} align={cell.align}>
                {cell.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <React.Fragment key={index}>
                <TableRow style={{ backgroundColor: "#333" }}>
                  <TableCell style={{ color: "white" }}>
                    {index + 1}
                  </TableCell>
                  {headCells.map((head, index) => (
                    <TableCell
                      //style={{ color: "white" }}
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
                        {row[ChildObjectName].map((elemt, index) => (
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
            );
          })}

          {billTotal >= 0 && (
            <tr>
              <th colSpan={headCells.length - 1}></th>
              <th style={{ borderBottom: "1px solid #cacaca" }}>
                <h5> {lastRow ? lastRow : "Total"} </h5>
              </th>
              <th align="right" style={{ borderBottom: "1px solid #cacaca" }}>
                <h5>{currency(billTotal)}</h5>
              </th>
            </tr>
          )}
          {children}
        </tbody>
      </table>
      {shiblingRows?.length == 0 ? "" : (
        <Table size="small" aria-label="simple table" id="table-to-xls">
          <TableHead style={{ backgroundColor: "#eee", height: 60 }}>
            <TableRow>
              <TableCell width={10}>#</TableCell>

              {ShiblingHeadCell?.map((head, index) => (
                <TableCell key={index} align={head.align}>
                  {head.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              shiblingRows && shiblingRows[0] && (
                <TableRow key={0}>
                  <TableCell>1</TableCell>
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
      <Box style={{ margin: 10 }}>
        {summery ? (
          <div>
            No of Invoice: {summery.numberOfInvoice}<br />
            Invoice Total: {currency(summery.invoiceTotal)}<br />
            Disscount Total: {currency(summery.discountTotal)}<br />
            Paid Total : {currency(summery.paidTotal)}<br />
            Outsatanding : {currency(parseFloat(summery.totalWithDiscount) - parseFloat(summery.paidTotal))}
          </div>
        ) : ''


        }
      </Box>

    </>

  );
}