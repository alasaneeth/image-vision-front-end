import ReportFooter from "Components/Reports/reportFooter";
import BillFooter from "Components/Print/BillFooterDot"
import BillHeaderDot from "Components/Print/billHeaderDot";
import React from "react";
import "./style-receipt.css";
export default function Receipts({ title = "Bizx Auto care", children, dateTime }) {
  return (
    <div>
      <div className="bill-page-header">
      
        <BillHeaderDot title={title} dateTime={dateTime} />
      </div>

      {/* <div className="page-footer">
      <BillFooter/> 
      </div> */}

      <table>
        <thead>
          <tr>
            <td>
              <div className="invoice-page-header-space"></div>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div className="page">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the printing
                </p>
                {children}
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>
              <div className="page-footer-space"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
