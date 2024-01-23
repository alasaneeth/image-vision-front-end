import ReportFooter from "Components/Reports/reportFooter";
import BillHeader from "Components/Print/billHeaderPos";
import React from "react";
import "./style-receipt.css";
export default function Receipts({ title = "Bizx Auto care", children, date }) {
  return (
    <div>
      <div className="bill-page-header">
      
        <BillHeader title={title} date={date} />
      </div>

      <div className="page-footer">
        {/* <ReportFooter /> */}
      </div>

      <table>
        <thead>
          <tr>
            <td>
              <div className="page-header-space"></div>
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
