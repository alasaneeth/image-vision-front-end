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
import { useReactToPrint } from "react-to-print";
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


  const billReceiptPrintComponent = React.useRef(null);
  const computerReceiptPrintComponent = React.useRef(null);

  const handlePrint = useReactToPrint({

    content: () => printType.current == 'POS' ? billReceiptPrintComponent.current : computerReceiptPrintComponent.current,
    pageStyle: pageStyle.receipt,
  });

  const handlePrintPOS = useReactToPrint({
    content: () => billReceiptPrintComponent.current,
    pageStyle: pageStyle.receipt,
  });

  const handlePrintDotMatrix = useReactToPrint({
    content: () => computerReceiptPrintComponent.current,
    pageStyle: pageStyle.invoiceA4,
  });


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
          {/* <div className="flex-end">

            <ReactToPrint
              trigger={() => (
                <Button style={{ marginBottom: 10 }}>Print this</Button>
              )}
              content={() => componentRef.current}
              pageStyle={pageStyle}
            />
          </div> */}
          <div className="flex-end"> 
            <Button 

              onClick={() => {
                setOpenBillPrint(true)

              }}
              // startIcon={
              //   props.isSubmitting && (
              //     <CircularProgress color="inherit" size={20} />
              //   )
              // }
              type="submit"
            >
              Print
            </Button>
          </div>
       

          <BasicDialog
              title="Payment Receipt"
              open={openBillPrint}
              onClose={(e) => setOpenBillPrint(false)}
            >
              <div>     

              </div>
              <div className="flex">
                <button
                  type="button"
                  className="btn-success button"
                  onClick={() => {
                    printType.current = 'POS';
                    handlePrintPOS();
                    setOpenBillPrint(false)

                  }}
                >
                  pos bill
                  {/* <span>
                    {isSubmitting ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                      />
                    ) : (
                      "[ Enter ]"
                    )}
                  </span> */}
                </button>

                <button
                  type="button"
                  // disabled={
                  //   !cashPaymentValidity() || isSubmitting
                  // }
                  onClick={() => {
                    printType.current = 'DOT';
                    handlePrintDotMatrix();
                    setOpenBillPrint(false)

                  }}
                  className="btn-success button"
                >
                  Dot matrix bill
                  {/* <span>
                    {isSubmitting ? ( 
                       <CircularProgress
                        color="inherit"
                        size={20}
                      /> 
                      ) : (
                      ""
                    )} 
                  </span> */}
                </button>

              </div>
              <div className="flex-end">
                <Button
                  color="secondary"
                  onClick={() => {
                    setOpenBillPrint(false)
                  }}
                >
                  Close
                </Button>
              </div>
            </BasicDialog>
          <div>
            <div ref={componentRef} className={classes.printArea}>
              <Reports title={"PAYMENT RECEIPT"}>
              <Grid container>
                <Grid item xs={6}>
                {data.parcelImages.map(image => (
             <div key={image.id}>
              <img style={{height:300, width:250}} src={ "http://localhost/Image-vision-api/public"+ image.path} alt={`Image for `} />
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
