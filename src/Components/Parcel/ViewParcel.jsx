import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Paper, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Reports from "Components/Print/a4-report-print";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import { useQuery } from "react-query";
import { REACT_QUERY_KEYS } from "Components/Constants/ReactQueryKeys";
import { ErrorMessage } from "formik";
import BasicDialog from "Components/MUI_components/Dialog-Box/basicDialog";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { currency } from "Components/MUI_components/currencyFormatterTag";
import Loading from "Components/MUI_components/loading";
import { pageStyle } from "Components/Print/printPagesStyles";
import ParcelService from "Service/Parcel/ParcelService.service"

const PREFIX = "ViewPaymentReceipt";
const classes = {
  root: `${PREFIX}-root`,
  printArea: `${PREFIX}-printArea`,
  paper: `${PREFIX}-paper`,
  image: `${PREFIX}-image`,
  img: `${PREFIX}-img`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  [`&.${classes.printArea}`]: {
    padding: "0 5rem",
  },
  [`&.${classes.paper}`]: {
    padding: theme.spacing(2),
    margin: ".5rem 3rem",
  },
  [`&.${classes.image}`]: {
    width: 128,
    height: 128,
  },
  [`&.${classes.img}`]: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
export function CombineTypographyInline({ children, title }) {
  return (
    <div style={{ display: "flex" }}>
      {children !== null && (
        <>
          <Typography gutterBottom color="textSecondary" variant="body2">
            {title}:
          </Typography>
          &nbsp; &nbsp;
          <Typography color="primary" variant="body2">
            {children}
          </Typography>
        </>
      )}
    </div>
  );
}
export function CombineTypography({ children, title }) {
  return (
    <>
      {children !== null && (
        <Typography
          component="div"
          gutterBottom
          color="textSecondary"
          variant="body2"
        >
          {title}:
          <Typography color="textPrimary" variant="body2">
            &nbsp; {children}
          </Typography>
        </Typography>
      )}
    </>
  );
}

export default function ComplexGrid({ code }) {
  const dispatch = useDispatch();
  const paymentTypes = useSelector((state) => state.paymentType);
  const [openBillPrint, setOpenBillPrint] = useState();
  const printType = useRef('');

  const fontSize = { fontSize: 13 };

  const { isError, isLoading, data } = useQuery(
    [REACT_QUERY_KEYS.VIEW_PARCEL, code],
    () => ParcelService.get(code),
    { enabled: !!code }

  )
  const componentRef = useRef();
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <ErrorMessage />
  }

  const openImageInNewTab = (url) => {
    window.open(url, '_blank');
  }
  
  return (
    <div>
      <Root className={classes.root}>

        <Paper
          style={{
            width: "21cm",
            padding: "10px 30px 45px 30px",
            minHeight: "85vh",
          }}
        >
          <div className="flex-end">

            <ReactToPrint
              trigger={() => (
                <Button style={{ marginBottom: 10 }}>Print this</Button>
              )}
              content={() => componentRef.current}
              pageStyle={pageStyle}
            />
          </div>
        
          <div>
            <div ref={componentRef} className={classes.printArea}>
              <Reports title={"PAYMENT RECEIPT"}>
              <Grid container>
                <Grid item xs={6}>
                {data.parcelImages.map(image => (
             <div key={image.id}>
              <img 
                style={{height:300, width:250, cursor: 'pointer'}} 
                src={"http://localhost/Image-vision-api/public" + image.path} 
                alt={`Image for `} 
                onClick={() => openImageInNewTab("http://localhost/Image-vision-api/public" + image.path)}
              />
            </div>
                ))}
                </Grid>
                <Grid item xs={6}>
                  <Table  size="small" aria-label="simple table" id="table-to-xls">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Weight</strong> </TableCell>
                        <TableCell><strong>{data.weight}kg</strong> </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Customer:</strong>  </TableCell>
                        <TableCell><strong>{data.customer.firstName} {data.customer.lastName}</strong> </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Route:</strong> </TableCell>
                        <TableCell><strong>{data.route.routeName}</strong> </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Courier: </strong> </TableCell>
                        <TableCell><strong>{data.route.courier.name}</strong> </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>From:</strong>  </TableCell>
                        <TableCell><strong>{data.fromLocation.name}</strong> </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>To:</strong>  </TableCell>
                        <TableCell><strong>{data.toLocation.name}</strong> </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </Grid>
              </Grid>
             
              </Reports>
            </div>
          </div>
        </Paper>
      </Root>

      
    </div>
  );
}
