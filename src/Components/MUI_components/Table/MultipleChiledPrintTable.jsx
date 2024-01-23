import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { currency } from "../currencyFormatterTag";

export default function NestedReportPrintTable({
  rows,
  headCells,
  billTotal,
  lastRow,
  children,
  ChildHeadCells1,
  ChildObjectName1,
  ChildHeadCells2,
  ChildObjectName2,
  ChildHeadCells3,
  chequeReturnRows,
  details,
  paidStatus
}) {
  return ( 
    <>
    <div style={{ marginLeft: 10 }}>
      Customer: {details?.customername}<br />
      Credit Amout(OS): {currency(details?.creditAmount) }<br />
      Over Payment : {currency(details?.overpayment)}<br />
      Return Amount :{currency(details?.returnAmount)} {paidStatus == 0 ? ` (with Bill : ${details?.totalReturnWithBill}, without Bill: ${details?.returnAmount - details?.totalReturnWithBill})` : ""} <br />
      Cheque Return Amount: {currency(details?.chequeReturnAmount) }
    </div>
    <table className="print-table" aria-label="customized table"   id="table-to-xls">
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
              <TableRow style={{ backgroundColor: "#000000" }}>
                <TableCell >
                  {index + 1}
                </TableCell>
                {headCells.map((head, index) => (
                  <TableCell
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
                        {ChildHeadCells1.map((head, index) => (
                          <TableCell key={index} align={head.align}>
                            {head.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row[ChildObjectName1].map((elemt, index) => (
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
                <TableRow>
                <TableCell colSpan={headCells.length + 1}>
                  <Table
                    size="small"
                    aria-label="simple table"
                    className="mb"
                  >
                    <TableHead style={{ backgroundColor: "#eeeeee70" }}>
                      <TableRow>
                        {row[ChildObjectName2].length == 0 ? "" : ChildHeadCells2.map((head, index) => (
                          <TableCell key={index} align={head.align}>
                            {head.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row[ChildObjectName2].map((elemt, index) => (
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
                          {chequeReturnRows.length > 0 && (
                            ChildHeadCells3?.map((head, index) => (
                              <TableCell key={index} align={head.align}>
                                {head.label}
                              </TableCell>
                            ))
                          )}
  
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(chequeReturnRows).map((elemt, index) => (
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
    </>
   
  );
}
