import { Typography } from "@mui/material";
import header from "../../Assets/header.png";

const BillHeader = ({ title, date, noDateAndTime }) => {
  const today = date ? new Date(date) : new Date();

  return (
    <>
      <div className="bill-reportHeader">
        <div>
          <img src={header}
           alt="Paris"
           style={{ width: "100%" }}
           marginRight='auto'
           marginLeft='auto'
          
           />
        </div>

        {/* <div
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: 14,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div> */}

      </div>


      
              {/* <div>
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
        </div> */}
  

    </>
  );
};

export default BillHeader;
