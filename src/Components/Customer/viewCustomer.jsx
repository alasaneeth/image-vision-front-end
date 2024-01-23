import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useQuery } from "react-query";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Loading from "../MUI_components/loading";
import customerService from "../../Service/Customer/customer.service";
import { Grid, Paper, Rating } from "@mui/material";
import { Box } from "@mui/system";

import Reports from "Components/Print/a4-report-print";
import ErrorMessage from "Components/MUI_components/ErrorMessage";
import { REACT_QUERY_KEYS } from "Components/Constants/ReactQueryKeys";

export function CombineTypographyInline({ children, title }) {


  return (
    <div style={{ display: "flex" }}>
      {children !== null && (
        <>
          <Typography
            gutterBottom
            component="div"
            color="primary"
            variant="body2"
          >
            {title}:
          </Typography>
          &nbsp; &nbsp;
          <Typography color="primary" component="div" variant="body2">
            {children}
          </Typography>
        </>
      )}
    </div>
  );
}
export function CombineTypography(props) {
  const { children, title } = props;
  return (
    <>
      {children !== null && (
        <>
          <Typography
            component="div"
            gutterBottom
            color="primary"
            variant="body1"
          >
            {title}:
          </Typography>
          &nbsp; &nbsp;
          <Typography component="span" color="primary" variant="body2">
            &nbsp; {children}
          </Typography>
        </>
      )}
    </>
  );
}
export default function ComplexGrid({ code, pageStyle }) {


  const { isError, isLoading, data } = useQuery(
    [REACT_QUERY_KEYS.VIEW_CUSTOMER, code],
    () => customerService.get(code),
    { enabled: !!code}

  )
  const componentRef = useRef();

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <ErrorMessage />
  }
  return (
    <div className="flex justify-content-center">
      <Paper
        style={{
          width: "21cm",
          padding: "10px 30px 45px 30px",
        }}
      >
        <div className="flex-end">
          <ReactToPrint
            trigger={() => <Button>Print this</Button>}
            //content={() => componentRef.current}
            pageStyle={pageStyle}
          />
        </div>
        <div>
          <div ref={componentRef}>
            <Reports title="Customer Information">
              <Grid item xs={12} sm container>
                <Typography gutterBottom variant="subtitle1" title="Name">
                  Name:  {data.firstName ? data.firstName : + " " + data.secondName ? data.secondName : ""}
                </Typography>
              </Grid>
              <Grid item xs={12} sm container>
                <Typography gutterBottom variant="div">
                  {"Code: " + data.code}
                </Typography>
              </Grid>

              <hr className="mt" />
              <Grid container className="mt">
                <Grid item xs={4} sm container>
                  <Grid item xs>
                    <Box>
                      <CombineTypography title="Company">
                        {data.companyName}
                      </CombineTypography>
                      <CombineTypography title="NIC Number">
                        {data.nicNumber}
                      </CombineTypography>

                      <CombineTypography title="Passport Number">
                        {data.passportNumber}
                      </CombineTypography>
                      <Box
                        mt={1}
                        component="fieldset"
                        borderColor="transparent"
                      >
                        <Rating
                          size="small"
                          value={
                            data.rating === "" ? 0 : parseInt(data.rating)
                          }
                          color="secondary"
                          name="rating"
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item xs={4} sm container>
                  <Grid item xs>
                    <Box>
                      <CombineTypography title="Website">
                        {data.website}
                      </CombineTypography>
                      {/* <CombineTypography title="Status">
                      {data.isActive ? "Active" : "Inactive"}
                    </CombineTypography> */}

                      <CombineTypography title="Verified Status">
                        {data.isVerified === 1 ? "Verified" : "Not Verified"}
                      </CombineTypography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <hr className="mt" />
              <Grid container className="mt">
                {data.customerAddresses.length > 0 && (
                  <Grid item xs={6} sm container>
                    <Grid item xs>
                      <Box>
                        <Typography component="legend">Address</Typography>
                        <ol>
                          {data.customerAddresses.map((address, index) => (
                            <Box key={index} mt={1} mb={2} pl={4}>
                              <li>
                                <CombineTypographyInline title="Name">
                                  {data.firstName ? data.firstName : + " " + data.secondName ? data.secondName : ""}
                                </CombineTypographyInline>
                                <CombineTypographyInline title="Email">
                                  {data.email}
                                </CombineTypographyInline>
                                <CombineTypographyInline title="Primary Contact">
                                  {data.phone1}
                                </CombineTypographyInline>
                                <CombineTypographyInline title="Secondary Contact">
                                  {data.phone2}
                                </CombineTypographyInline>
                                <CombineTypographyInline title="Post Box No">
                                  {address.postBox}
                                </CombineTypographyInline>
                                <CombineTypographyInline title="Address">
                                  {address.address}
                                </CombineTypographyInline>
                                <CombineTypographyInline title="Country">
                                  {address.country}
                                </CombineTypographyInline>
                                <CombineTypographyInline title="District">
                                  {address.district}
                                </CombineTypographyInline>
                                <CombineTypographyInline title="City">
                                  {address.city}
                                </CombineTypographyInline>
                                <CombineTypographyInline title="Status">
                                  {address.isActive ? "Active" : "Inactive"}
                                </CombineTypographyInline>
                              </li>
                            </Box>
                          ))}
                        </ol>
                      </Box>
                    </Grid>
                  </Grid>
                )}

              </Grid>

              <hr className="mb" />
              <Grid container className="mt">
                <Grid item xs={12} md={12} lg={12} sm container>
                  <Grid item xs>
                    <Box>
                      <Typography
                        style={{ marginBottom: 5,textAlign:"center", fontWeight:"bold" }}
                        component="legend"
                      >
                        Vehicles Details
                      </Typography>
                      <table
                        className="print-table"
                        aria-label="customized table"
                      >
                        <thead className="thead">
                          <tr
                            style={{
                              borderBottom: "1px solid #24242450",
                              backgroundColor: "#cacaca",
                            }}
                            className="mt"
                          >
                            <th width="20" align="center">
                              #
                            </th>
                            <th>Description</th>
                            <th>Vehicle Number</th>
                            <th>Type</th>
                            <th>Brand</th>
                          </tr>
                        </thead>
                        <tbody>
                      
                          {data.vehicleMasters.map((row, index)=>(
                              <tr key={index}>
                              <td align="center">{index+1}</td>
                              <td align="center">{row.description}</td>
                              <td align="center">{row.vehicleNumber}</td>
                              <td align="center">{row.vehicleType.name}</td>
                              <td align="center">{row.vehicleBrand.name}</td>
                            </tr>
                          ))}
                          
                        
                         
                        </tbody>
                      </table>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Reports>
          </div>
        </div>
      </Paper>
    </div>
  );
}
