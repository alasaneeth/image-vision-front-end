// import React from "react";
// import { currency } from "../MUI_components/currencyFormatterTag";

// export default function ReportPrintTable({
//   rows,
//   headCells,
//   billTotal,
//   ChildHeadCells,
// }) {
//   return (
//     <table className="print-table" aria-label="customized table">
//       <thead className="thead">
//         <tr
//           style={{
//             borderBottom: "1px solid #24242450",
//             backgroundColor: "#cacaca",
//           }}
//           className="mt"
//         >
//           <th width="20" align="center">
//             SN
//           </th>
//           {headCells.map((cell, index) => (
//             <th key={index} align={cell.align}>
//               {cell.label}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((row, index) => {
//           return (
//             <React.Fragment key={index}>
//               <tr style={{ backgroundColor: "#333" }}>
//                 <td align="center" style={{ color: "white" }}>
//                   {index + 1}
//                 </td>
//                 {headCells.map((cell, index) => {
//                   return (
//                     <td
//                       key={index}
//                       align={cell.align}
//                       style={{ color: "white" }}
//                     >
//                       {cell.currency ? currency(cell.key(row)) : cell.key(row)}
//                     </td>
//                   );
//                 })}
//               </tr>
//               <tr>
//                 <td colSpan={headCells.length + 1}>
//                   <table width={`100%`} className="mb">
//                     <thead style={{ backgroundColor: "#eeeeee70" }}>
//                       <tr>
//                         {ChildHeadCells.map((head, index) => (
//                           <th key={index} align={head.align}>
//                             {head.label}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {row.stockHistory.map((elemt, index) => (
//                         <tr>
//                           {ChildHeadCells.map((head, i) => (
//                             <td key={i} align={head.align}>
//                               {head.currency
//                                 ? currency(head.key(elemt))
//                                 : head.key(elemt)}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             </React.Fragment>
//           );
//         })}
//         {billTotal >= 0 && (
//           <tr>
//             <th colSpan={4}></th>
//             <th style={{ borderBottom: "1px solid #cacaca" }}>
//               <h5> Total</h5>
//             </th>
//             <th align="right" style={{ borderBottom: "1px solid #cacaca" }}>
//               <h5>{currency(billTotal)}</h5>
//             </th>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// }
