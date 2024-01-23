import React, { useRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../Redux/Actions/snackbarActions";
import Loading from "../../MUI_components/loading";
import { currency } from "../../MUI_components/currencyFormatterTag";
import { Button, Paper, TableCell, TableRow, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import Reports from "Components/Print/a4-report-print";
import StockTransferService from "../../../Service/Stock/stockTransfer.service";
import { stockLocationActionSelectors } from "Redux/Selectors";
import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import { useQuery } from "react-query";
import { REACT_QUERY_KEYS } from "Components/Constants/ReactQueryKeys";
import { ErrorMessage } from "formik";
const PREFIX = "viewStockTransfer";
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
export default function ComplexGrid({ code, pageStyle }) {
    const stockLocations = useSelector((state) => state.location);
    const dispatch = useDispatch();
	
   
    const { isError, isLoading, data } = useQuery(
        [REACT_QUERY_KEYS.STOCK_TRANSFER, code],
        () => StockTransferService.get(code),
        { enabled: !!code}
    
      )

    const componentRef = useRef();

    if (isLoading) {
        return <Loading />
      }
      if (isError) {
        return <ErrorMessage />
      }
	  
	    const total = data.stockHistories
                    .map((row) =>
                        row.retailPrice * row.quantity)
                    .reduce((sum, i) => sum + i, 0);
                  

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
                                    <Button
                                        style={{ marginBottom: 10 }}>
                                        Print this</Button>
                                )}
                                content={() => componentRef.current}
                                pageStyle={pageStyle}
                            />
                        </div>
                       
                        <div>
                            <div ref={componentRef} className={classes.printArea}>
                                <Reports title="STOCK TRANSFER">
                                    <hr />

                                    <table
                                        aria-label="spanning table"
                        
                                        className="mt fullWidth"
                                    >
                                        <thead>
                                            <tr>
                                                <td>{COLUMNS_NAME.CODE}:</td>
                                                <td colSpan="2">{data.code}</td>

                                                <td>{COLUMNS_NAME.DATE}: </td>
                                                <td colSpan="2">{data.transferDateTime}</td>
                                            </tr>
                                            <tr>
                                                <td>{COLUMNS_NAME.FROM}:</td>
                                                <td colSpan="2">{stockLocations.filter(
                                                    (location) => location.code == data.fromCode
                                                )[0].name}</td>

                                                <td>{COLUMNS_NAME.TO}:</td>
                                                <td colSpan="2">{stockLocations.filter(
                                                    (location) => location.code == data.toCode
                                                )[0].name}</td>
                                            </tr>
                                            <tr>
                                                <td>{COLUMNS_NAME.REMARKS}:</td>
                                                <td colSpan="2">{data.remarks}</td>
                                            </tr>
                                        </thead>
                                    </table>
                                    <table>
                                        <thead style={{
                                            borderBottom: "5px solid #24242450",
                                            fontWeight: 'bold'
                                        }}>

                                        </thead>
                                    </table>

                                    <table>
                                        <thead style={{
                                            borderBottom: "5px solid #24242450",
                                            fontWeight: 'bold'
                                        }}>

                                        </thead>
                                    </table>
                                    <table
                                        className="print-table "
                                        aria-label="customized table"
                                    >
                                        <thead className="thead">
                                            <tr
                                                style={{
                                                    borderBottom: "1px solid #24242450",
                                                }}
                                            >
                                                <th align="left">
                                                    #
                                                </th>
                                                <th align="left">{COLUMNS_NAME.CODE}</th>
                                                <th align="left" colSpan={5}>{COLUMNS_NAME.DESCRIPTION}</th>
                                                <th align="right"> {COLUMNS_NAME.QUANTITY}</th>
                                                <th align="right">{COLUMNS_NAME.UNIT_PRICE}</th>
                                                <th align="right">{COLUMNS_NAME.AMOUNT}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.stockHistories.map((row, i) => (
                                                <tr>
                                                    <td align="left" >{i + 1}</td>
                                                    <td align="left">{row.itemMaster.barcode}</td>
                                                    <td align="left" colSpan={5} >{row.itemMaster.name}</td>
                                                    <td align="right">{row.quantity}</td>
                                                    <td align="right">{currency(row.retailPrice)}</td>
                                                    <td align="right">{currency(row.quantity * row.retailPrice)}</td>
                                                </tr>

                                            ))}

                                            <tr>
                                                <th align="right" colSpan={9} >
                                                    <strong>{COLUMNS_NAME.LAST_TOTAL}</strong>
                                                </th>
                                                <td align="right">
                                                    <strong>{currency(total)}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>



                                    <div className="row" style={{ marginTop: 60 }}>
                                        <div className="col-6">
                                            <div
                                                style={{
                                                    borderTop: "1px dashed #000000",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Prepaired by
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div
                                                style={{
                                                    borderTop: "1px dashed #000000",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Approved by
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginTop: 30 }}>
                                        <div className="col-6">
                                            <div
                                                style={{
                                                    borderTop: "1px dashed #000000",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {COLUMNS_NAME.CHECKED_BY}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div
                                                style={{
                                                    borderTop: "1px dashed #000000",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {COLUMNS_NAME.RECEIVED_BY}
                                            </div>
                                        </div>
                                    </div>
                                </Reports>
                            </div>
                        </div>
                    </Paper>

            </Root>
        </div>
    );
}
