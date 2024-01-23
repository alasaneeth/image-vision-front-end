import React from "react";
import { currency } from "../MUI_components/currencyFormatterTag";

export default function ReportPrintTable({
  rows,
  headCells,
  billTotal,
  lastRow,
  children,
}) {
  return (
    <table className="print-table" aria-label="customized table"  id="table-to-xls">
      <thead className="thead">
        <tr
          style={{
            borderBottom: "1px solid #24242450",
            backgroundColor: "#cacaca",
            marginBottom:"50px"
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
              <tr>
                <td align="center">{index + 1}</td>
                {headCells.map((cell, index) => {
                  return (
                    <td key={index} align={cell.align}>
                      {cell.key(row)
                        ? cell.currency
                          ? currency(cell.key(row))
                          : cell.key(row)
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            </React.Fragment>
          );
        })}
        {1 >= 0 && (

          billTotal ? (
            <table>
              <tbody>
                <tr>
                  {/* <th colSpan={headCells.length - 1}></th> */}
                  <td style={{ borderBottom: "1px solid #cacaca" }}>
                    <h5>{lastRow ? lastRow : "Total"}</h5>
                  </td>
                  <td align="right" style={{ borderBottom: "1px solid #cacaca" }}>
                    <h5>{currency(billTotal)}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : ("")
        )}
        {children}
      </tbody>
    </table>
  );
}
