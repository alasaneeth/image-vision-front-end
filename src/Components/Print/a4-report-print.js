import React from "react";
import "./style-report.css";
export default function Reports({ children, title = "Reports" }) {
  const today = new Date();

  return (
    <div>
      <div className="r-page-header">
       
        <div className="space-between">
          <p>Date: &nbsp; {today.toDateString()}</p>
          <p>Time: &nbsp; {today.toLocaleTimeString()}</p>
        </div>
      </div>



      <table>
        <thead>
          <tr>
            <td>
              <div className="r-page-header-space"></div>
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div className="r-page">
                <h1 style={{ textAlign: "center", marginBottom: 10, marginTop:10 }}>
                  {title}
                </h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the printing has
                  been the printing
                </p>
                {children}
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>
              <div className="r-page-footer-space"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
