import React from "react";
import "./styleDotmatrix.css";
import { currency } from "../../../MUI_components/currencyFormatterTag";
import { useSelector } from "react-redux";
import Receipts from "Components/Print/dot-invoice-receipt";
import customerService from "Service/Customer/customer.service";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { width } from "@mui/system";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";

import { CLIENTS } from "titum-custom/Clients";
import { PAYMENT_STATUS_CODE } from "Components/Constants/PaymentStatusCode";
import { CUSTOMER_CONST } from "Components/Constants/CustomerContsnt";
const Print = React.forwardRef((props, ref) => {

  const { invoiceCode, dateTime } = useSelector((state) => state.lastInsertInvoice);
  // const printedDate = date ? new Date(date) : new Date();
  // Create a Date object
  var now = new Date();

  // Extract the date components
  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with 0 if necessary
  var day = String(now.getDate()).padStart(2, '0');
  var hours = String(now.getHours()).padStart(2, '0');
  var minutes = String(now.getMinutes()).padStart(2, '0');
  var seconds = String(now.getSeconds()).padStart(2, '0');

  // Concatenate the components
  var today = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

  //console.log(formattedDate);
  // const { data, paymentTypes } = props;
  // const { stockHistories, customer, salesQuotation } = data;
  const { submittedData, pageStatus } = props
  const { stockHistories, customer } = submittedData;

  //Stock History Level
  const handleLineTotal = (qty, price, discountPer, discountAmount) => {
    let totalAmount = qty * price;
    discountAmount = discountAmount * qty;
    let lineTotalAmount = totalAmount - totalAmount * (discountPer / 100) - discountAmount;
    return lineTotalAmount;
  };

  //Invoice Level Calculations

  // const subTotalAmount = stockHistories
  //   .map(({ quantity, discountPercentage, discountAmount, retailPrice }) =>
  //     handleLineTotal(

  //       quantity,
  //       retailPrice,
  //       discountPercentage,
  //       discountAmount
  //     )
  //   )
  //   .reduce((sum, i) => sum + i, 0);

  // const billDiscount =
  //   subTotalAmount * (data.discountPercentage / 100) +
  //   parseFloat(data.discountAmount ? data.discountAmount : 0);

  // const totalAmount = stockHistories
  //   .map(({ quantity, discountPercentage, discountAmount, retailPrice }) =>
  //     handleLineTotal(

  //       quantity,
  //       retailPrice,
  //       discountPercentage,
  //       discountAmount
  //     )
  //   )
  //   .reduce((sum, i) => sum + i, 0) - billDiscount;

  // const totalLineDiscount = (stockHistories
  //   .map(({ quantity, retailPrice }) =>

  //     quantity *
  //     retailPrice
  //   )
  //   .reduce((sum, i) => sum + i, 0)) - subTotalAmount;

  // const discountTotal = billDiscount + totalLineDiscount;

  const billCredit = submittedData.totalAmount > submittedData.receivedAmount
    ? parseFloat(submittedData.totalAmount) - parseFloat(submittedData.receivedAmount)
    : 0;

    const totalOutStanding = submittedData.isCustomerChanged ? parseFloat(customer.creditAmount) +  parseFloat(submittedData.totalAmount) :
 (submittedData.paidStatus === PAYMENT_STATUS_CODE.PAYMENT_NOT_DONE && customer && submittedData.previousBillAmount) ?
    (parseFloat(customer.creditAmount ? customer.creditAmount : 0.00) - parseFloat(submittedData.previousBillAmount)) + parseFloat(submittedData.totalAmount)
    :
    customer ? (pageStatus.recalled ? customer.creditAmount ? customer.creditAmount : 0.00 :
      billCredit ? billCredit + (parseFloat(customer.creditAmount ? customer.creditAmount : 0)) : customer.creditAmount) : "0.00"

  const chequeReturnAmount = parseFloat(customer?.chequeReturnAmount ? customer.chequeReturnAmount : 0);

  const prsrOtstanding = parseFloat(totalOutStanding == null ? 0 : totalOutStanding)

  // Calculate the outstandingWithCheque
  const outstandingWithCheque = chequeReturnAmount + prsrOtstanding;

  return (

    <div className="printArea" ref={ref}>
      <>
        <Receipts
          dateTime={dateTime}
          title={`INVOICE ${props.code && "RE-Printed"} - ${submittedData.code ? submittedData.code : props.invoiceCode
            }`}
        >

          <table className="print-table-pos">

            <div align="center"><strong>{`INVOICE ${pageStatus.recalled ? "Re-Printed" : ""} - ${submittedData.code ?? props.code}`}</strong></div>
            <Grid container style={{ fontSize: 11 }}>
              <Grid item xs={4}>
                <Box sx={{ marginLeft: 2 }}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          {customer ? customer.customCode : ""} 
                        </td>
                      </tr>
                      <tr>
                        <td>
                          TO: {customer ? customer.firstName : " Cash"}
                        </td>
                      </tr>
                      <tr>
                        <td >
                          {customer ? (customer.customerAddresses ? (customer.customerAddresses[0] ? (customer.customerAddresses[0].address ? customer.customerAddresses[0].address : "-") : "-") : "-") : "-" || customer.phone1}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <tr><td> {customer ? (customer.customerAddresses ? (customer.customerAddresses[0] ? " " + (customer.customerAddresses[0].city ? customer.customerAddresses[0].city : "-") : "-") : "-") : "-"}</td></tr>

                        </td>
                      </tr>


                      <tr>
                        <td >
                        {customer?.phone1}/
                          {customer ? (customer.customerAddresses ? (customer.customerAddresses[0] ? (customer.customerAddresses[0].phone1 ? customer.customerAddresses[0].phone1 : "-") : "-") : "--") : "-"}
                       

                        </td>
                      </tr>
                      <tr>
                        <td>
                          {COLUMNS_NAME.REMARKS} : {submittedData.remarks}
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </Box>

              </Grid>


              <Grid item xs={4}>
                <table>
                  <tbody>

                    <tr>
                      <td>
                        INVOICE NO:  {`${submittedData.code}`}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {pageStatus.adding ? `DATE : ${today}` : `DATE : ${submittedData.createdAt ? submittedData.createdAt : submittedData.dateTime}`}

                      </td>
                    </tr>
                    <tr>
                      <td>
                        PAYMENT TYPE: {parseFloat(submittedData.receivedAmount) >= parseFloat(submittedData.totalAmount)  ? "Cash" : "Credit"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        SALES REP:{customer ? " " + ((customer.route ? customer.route.salesRep?.fullName : "-") + " / " + (customer.route ? customer.route.name : "-")) : " "}

                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
              <Grid item xs={3}>
                <table>
                  <tbody>

                    <tr>
                      <td>
                        Q.No: {submittedData.salesQuotationCode}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        S.No:
                      </td>
                    </tr>
                    <tr>
                      {/* <td>
                        {System.CLIENT === CLIENTS.ALL_FOCUS && "BILLING DATE :" + today}
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </Grid>

            </Grid></table>
          <Box sx={{ marginLeft: 2, marginRight: 2, marginTop: 2 }}>

            <table className="print-table-pos" style={{ marginRight: 100 }}>

              <thead>
                <tr
                  style={{
                    borderTop: "1px solid #24242450",
                    borderBottom: "1px solid #24242450",
                  }}>

                  <th width="10">#</th>
                  <th align="center" width="100">
                    <strong>{COLUMNS_NAME.CODE}</strong>
                  </th>
                  <th align="left" width="250" >
                    <strong>{COLUMNS_NAME.DESCRIPTION}</strong>
                  </th>
                  <th align="center" width="70">
                    <strong>Unit</strong>
                  </th>
                  <th align="center" width="90">
                    <strong>{COLUMNS_NAME.QUANTITY}</strong>
                  </th>
                  <th align="right" width="90">
                    <strong>{COLUMNS_NAME.UNIT_PRICE}</strong>
                  </th>
                  <th align="right" width="80">
                    <strong>{COLUMNS_NAME.DISCOUNT_PERCENTAGE}</strong>
                  </th>
                  <th align="right" width="90">
                    <strong>{COLUMNS_NAME.DISCOUNT_AMOUNT}</strong>
                  </th>
                  <th align="right" width="100">
                    <strong>{COLUMNS_NAME.AMOUNT} </strong></th>
                </tr>
              </thead>

              <tbody>
                {stockHistories
                  .filter(i => i.quantity > 0)
                  .map((row, index) => (
                    < React.Fragment key={index} >
                      <tr>

                        <td>{index + 1}. </td>
                        <td align="center">{row.itemMaster.barcode}</td>
                        <td style={{ wordBreak: "break-word" }}>
                          {row.name ? row.name : row.itemMaster.name}
                        </td>
                        <td align="center"  >{row.unitName ? row.unitName : row.itemMaster?.itemUnit?.name}</td>
                        <td align="center">{currency(row.quantity)}</td>
                        <td align="right">{currency(row.retailPrice)}</td>
                        <td align="right">{currency(row.discountPercentage)}%</td>
                        <td align="right">{currency(row.discountAmount)}</td>
                        <td align="right">
                          {currency(
                            handleLineTotal(
                              row.quantity,
                              row.retailPrice,
                              row.discountPercentage,
                              row.discountAmount
                            )
                          )}
                        </td>
                      </tr>
                    </React.Fragment>

                  ))}

              </tbody>
            </table>
            <div style={{ borderTop: "1px solid #24242450" }}></div>

            <table className="print-table-pos" style={{ marginTop: 10 }}>
              <Grid container style={{ fontSize: 11 }}>
                <Grid item xs={4}>
                  <table>
                    <tbody>
                      <tr><td>{COLUMNS_NAME.PAYMENT_RECIEVED} :</td></tr>
                      <tr><td>{COLUMNS_NAME.BALANCE_GIVEN} :</td></tr>
                      <tr><td> {COLUMNS_NAME.DISCOUNT_TOTAL} :</td></tr>
                      <tr><td>  {COLUMNS_NAME.OUTSTANDING} :</td></tr>
                    </tbody>
                  </table>
                </Grid>
                <Grid item xs={2}>
                  <table>
                    <tbody>
                      <tr><td align="right">{currency(submittedData.receivedAmount ? submittedData.receivedAmount : 0)}</td></tr>
                      <tr><td align="right">{parseFloat(submittedData.receivedAmount)  > parseFloat(submittedData.totalAmount)  ? `${currency(parseFloat(submittedData.receivedAmount)  - parseFloat(submittedData.totalAmount) )}` : "0.00"}</td></tr>                      
                      <tr><td align="right">{`${currency(submittedData.discountTotal)}`}</td></tr>
                      <tr><td align="right">{currency(totalOutStanding == null ? 0 :totalOutStanding )}</td></tr>
                    
                      
                      {/* <tr>
                   
                        <td align="right"> {
   //This is for credit bill
                          (submittedData.paidStatus === PAYMENT_STATUS_CODE.PAYMENT_NOT_DONE && customer && submittedData.previousBillAmount) ?
                            currency((parseFloat(customer.creditAmount ? customer.creditAmount : 0.00) - parseFloat(submittedData.previousBillAmount)) + parseFloat(submittedData.totalAmount))
                            :
                            customer ? (pageStatus.recalled ? currency(customer.creditAmount ? customer.creditAmount : 0.00) :
                              currency(billCredit ? billCredit + (parseFloat(customer.creditAmount ? customer.creditAmount : 0)) : customer.creditAmount)) : "0.00"}

                        </td></tr> */}

                    </tbody>
                  </table>
                </Grid>
                <Grid item xs={4}>
                  <table>
                    <tbody>
                      <tr><td>{COLUMNS_NAME.SUB_TOTAL} :</td></tr>
                      {/* <tr><td>{COLUMNSp_NAME.TOTAL_OUTSTANDING} :</td></tr> */}
                      <tr><td>{COLUMNS_NAME.BILL_DISCOUNT}({submittedData.discountPercentage}%) :</td></tr>
                      <tr><td> {COLUMNS_NAME.BILL_DISCOUNT_AMOUNT + " :"}</td></tr>
                      <tr><td style={{ fontSize: 15 }}><strong>{COLUMNS_NAME.LAST_TOTAL} :</strong> </td></tr>
                    </tbody>
                  </table>
                </Grid>

                <Grid flex="end" item xs={2}>
                  <table>
                    <tbody>
                      <tr><td align="right">{currency(submittedData.subTotalAmount)}</td></tr>
                      {/* <tr><td align="right">{currency(customer.creditAmount)}</td></tr> */}
                      <tr><td align="right"> {currency(submittedData.discountPercentage / 100 * submittedData.subTotalAmount)}</td></tr>
                      <tr style={{ borderBottom: "1px solid #24242450" }}><td align="right">{currency(submittedData.discountAmount)}</td></tr>
                      <tr><td align="right" style={{ fontSize: 15 }}><strong>{currency(submittedData.totalAmount)}</strong> </td></tr>
                    </tbody>
                  </table>
                </Grid>

              </Grid>
            </table>
            <div style={{ borderTop: "1px solid #24242450" }}></div>
            <div>

              <table className="print-table-pos" style={{ marginTop: 10 }}>
                <Grid container style={{ fontSize: 11 }}>
                  <Grid item xs={4} >
                    <table>
                      <tbody>
                        <tr><td>{COLUMNS_NAME.CHEQUE_RETURN_AMOUNT} : </td></tr>
                        <tr>
                          <td>{COLUMNS_NAME.OUTSTANDING_WITH_CHEQUE_RETURN} :</td>
                        </tr>
                      </tbody>
                    </table>
                  </Grid>
                  <Grid flex="end" item xs={2}>
                    <table>
                      <tbody>
                        <tr><td align="right">{customer?.chequeReturnAmount ? customer?.chequeReturnAmount : "0.00"}</td></tr>
                        <tr>
                          <td align="right">
                         {  customer?.customCode ==  CUSTOMER_CONST.CASH_CUSTOMER ? "0.00" :   currency(outstandingWithCheque)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Grid>
                </Grid>

              </table>


            </div>
            <div className="row" style={{ marginTop: 50 }}>
              <div className="col-4">
                <div
                  style={{
                    borderTop: "1px dashed 	#000000",
                    textAlign: "center",
                    fontSize: 12
                  }}
                >
                  {COLUMNS_NAME.PREPAIRED_BY}
                </div>
              </div>


              <div className="col-4">
                <div
                  style={{
                    borderTop: "1px dashed 	#000000",
                    textAlign: "center",
                    fontSize: 12
                  }}
                >
                  {COLUMNS_NAME.CHECKED_BY}
                </div>
              </div>

              <div className="col-4">
                <div
                  style={{
                    borderTop: "1px dashed 	#000000",
                    textAlign: "center",
                    fontSize: 12
                  }}
                >
                  Customer Acceptance
                </div>
              </div>
            </div>
           
          </Box>
        </Receipts>
      </>
    </div >

  );
});

export default Print;

