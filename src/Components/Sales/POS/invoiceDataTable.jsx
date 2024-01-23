import { Rowing } from "@mui/icons-material";
import {
    Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import React from "react";

import {currency} from "../../MUI_components/currencyFormatterTag"
import { MULTI_PURPOSE_STATUS } from "Components/Constants/MultiPurposeStatus";

export default function InvoiceTable(props) {
  const {data} = props;

  
  const setteledTotal = data.paymentReceipts
  .map((row)=>parseFloat(row.settledAmount) )
  .reduce((prev,curr)=>prev+curr, 0)
  return (
    <Paper  style={{
        width: "21cm",
        padding: "50px 30px 45px 30px",
        minHeight: "85vh",
        marginLeft:"100px"
      }}>
      {data && data.customer ? (
        <>
        
       
        <div className="mt mb">
            {/* <Typography variant="body2"> */}
              {/* <b>Customer: </b>
              {data.invoice.customer.customerAddresses.map((row)=> (
                row.firstName
              ))}
            </Typography> */}
           
            
              
        
            {/* <Typography
              variant="body2"
              style={{ color: data.paidStatus ? "green" : "crimson" }}
            >
              <b>Paid Status: </b>
              {data.paidStatus ? "Paid" : "Unpaid"}
            </Typography> */}
          </div>
        <div align='center'><strong>{`
            INVOICE DETAILS - ${data.status == MULTI_PURPOSE_STATUS.REVERSED ? 'Reversed' : 'Active'}
          `}</strong> </div>
          <Grid container>
                    <Grid xs={7}>
                      <table>
                        <tr><td>{data.customer.code}</td></tr>
                        <tr><td>To : {data.customer.firstName}</td></tr>
                       {data.customer.customerAddresses.map((row)=>(
                        <>
                            <tr><td>{row.address}</td></tr>
                            <tr><td>{row.city}</td></tr>
                            <tr><td>{row.phone1}</td></tr>
                        </>
                       ))}
                      </table>
                    </Grid> 
                    <Grid xs={5}>
                      <table>
                        <tr><td>{COLUMNS_NAME.INVOICE_NUMBER} :</td><td colSpan="2"> {data.code}</td></tr>
                        <tr><td></td></tr>
                        <tr> <td>{COLUMNS_NAME.DATE} :</td> <td>{data.date}</td></tr>
                      </table>
                    </Grid>
                  </Grid>

        
        
         
          <TableContainer>
            <Table size="small" width="800px" aria-label="spanning table">
              <TableHead style={{ backgroundColor: "#cacaca50" }}>
               
                <TableRow>
                  <TableCell width="5">#</TableCell>
                  <TableCell>{COLUMNS_NAME.CODE}</TableCell>
                  <TableCell>{COLUMNS_NAME.DESCRIPTION}</TableCell>
                  <TableCell align="right">{COLUMNS_NAME.QUANTITY}</TableCell>
                  <TableCell align="right">{COLUMNS_NAME.RETAIL_PRICE}</TableCell>
                  <TableCell align="right">{COLUMNS_NAME.DISCOUNT_PERCENTAGE}</TableCell>
                  <TableCell align="right">{COLUMNS_NAME.DISCOUNT_AMOUNT}</TableCell>
                  <TableCell align="right">{COLUMNS_NAME.TOTAL}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                {data.stockHistories.map((row,index)=> (

                <TableRow key={row.id}>
                <TableCell width="5">{index+1}</TableCell>
                <TableCell>{row.itemMaster.barcode}</TableCell>
                <TableCell align="left">{row.itemMaster.name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{currency(row.retailPrice) }</TableCell>
                <TableCell align="right">{row.discountPercentage}%</TableCell>
                <TableCell align="right">{currency(row.discountAmount)}</TableCell>
                <TableCell align="right">{currency(row.totalAmount)}</TableCell>
                </TableRow>
                ))}


            </TableBody>
              <TableHead>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell align="center" colSpan={7}>
                      No Data
                    </TableCell>
                  </TableRow>
                ) : (
                    
                  <>
                    <TableRow>
                      <TableCell colSpan={5} rowSpan={4} />
                      <TableCell align="left">{COLUMNS_NAME.SUB_TOTAL}</TableCell>
                      <TableCell align="right" colSpan={3}>
                        {currency(data.subTotalAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">{COLUMNS_NAME.DISCOUNT_PERCENTAGE}({data.discountPercentage}%)</TableCell>
                      <TableCell  colSpan={3} align="right">{data.discountPercentage} </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{COLUMNS_NAME.DISCOUNT_AMOUNT}</TableCell>
                        <TableCell  colSpan={3} align="right">{currency( data.discountAmount)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left"><strong> {COLUMNS_NAME.LAST_TOTAL}</strong></TableCell>
                      <TableCell align="right"  colSpan={3}>
                       <strong>{currency(data.totalAmount) }</strong>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableHead>
            </Table>
          </TableContainer>

          {data.paymentReceipts.length>0 && (
            <div>
            <div style={{marginTop:30}} align='center'><strong >RECIEPT DETAILS</strong></div>  
                      
         <TableContainer>
            <Table size="small" width="800px" aria-label="spanning table">
              <TableHead style={{ backgroundColor: "#cacaca50" }}>
                <TableRow>
                  <TableCell width="5">#</TableCell>
                  <TableCell>{COLUMNS_NAME.CODE}</TableCell>
                  <TableCell>{COLUMNS_NAME.DATE}</TableCell>
                  <TableCell align="right">{COLUMNS_NAME.AMOUNT}</TableCell>
                  <TableCell align="right">{COLUMNS_NAME.SETTELED_AMOUNT}</TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
                
                {data.paymentReceipts.map((row,index)=> (

                <TableRow>
                <TableCell width="5">{index+1}</TableCell>
                <TableCell align="left">{row.code}</TableCell>
                <TableCell>{row.paymentDateTime}</TableCell>
                <TableCell align="right">{row.totalAmount}</TableCell>
                <TableCell align="right">{row.settledAmount}</TableCell>
               
                </TableRow>
                ))}
            </TableBody>
            </Table>
          </TableContainer>       
            </div>
          )}
        

       
       
        </>
      ) : (
        <div
          className="flex justify-content-center fullWidth "
          style={{
            padding: 30,
          }}
        >
          {data === null ? "Invoice not found" : "No Data"}
        </div>
      )}


 

    </Paper>
  );
}
