import { currency } from "Components/MUI_components/currencyFormatterTag";
import React from "react";

export default function CustomizedTables({ rows, headCells, code }) {
  rows = rows.filter((value) => code.includes(value.code));
  return (
    <table className="print-table" aria-label="customized table">
      <thead>
        <tr
          style={{
            borderBottom: "1px solid #24242450",
          }}
        >
          <th width="20" align="center">
            SN
          </th>
          {headCells.map((cell, index) => (
            <th key={index} align={cell.numeric ? "right" : "left"}>
              {cell.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              <td align="center">{index + 1}</td>
              {headCells.map((cell, index) => {
                return (
                  <td
                    key={index}
                    align={cell.numeric ? "right" : "left"}
                    padding={cell.disablePadding ? "none" : "default"}
                  >
                    {cell.id(row) !== null
                      ? cell.numeric
                        ? currency(cell.id(row))
                        : cell.id(row)
                      : " - "}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
