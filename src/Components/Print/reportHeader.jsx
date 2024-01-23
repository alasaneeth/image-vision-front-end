import { Typography } from "@mui/material";
import header from "../../Assets/header1.png";

const ReportHeader = ({ title, date, noDateAndTime }) => {
  const today = date ? new Date(date) : new Date();
  return (
    <>
      <div className="reportHeader">
        <div className="space-between">
          <img src={header} alt="header" style={{ width: "100%" }} />
        </div>
        <div
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 14,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>

      </div>

      <>
      
              <div>
        {noDateAndTime ? null : (
        <div className="space-between mb" style={{ marginLeft: 10 , marginTop: 40}}>
          <Typography className="header-label">
            <span> Printed Date:&nbsp; {today.toDateString()}</span>
          </Typography>
          <Typography className="header-label"  style={{ marginRight: 20}}>
            <span> Printed Time: &nbsp; {today.toLocaleTimeString()}</span>
          </Typography>
        </div>
      )}
        </div>
      </>

    </>
  );
};

export default ReportHeader;
