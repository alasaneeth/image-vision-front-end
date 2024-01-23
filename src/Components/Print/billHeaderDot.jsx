import { Padding } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import header1 from "../../Assets/hed-autocare.png";


const BillHeader = ({ title, dateTime, noDateAndTime }) => {
  const today = dateTime ? new Date(dateTime) : new Date();
  return (
    <>
      <div>
        <Box sx={{marginLeft:10,marginRight:10}}>
        <img src={header1} alt="header" style={{ width: "100%"  }}  />
        </Box>
        
        
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
