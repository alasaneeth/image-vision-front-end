import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Form, Formik, FieldArray } from "formik";
import { openSnackbar } from "../../../Redux/Actions/snackbarActions";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";
import { Delete } from "@mui/icons-material";
import FormControl from "Components/MUI_components/FormControl/fomikFormControl";
import Stepper from "Components/MUI_components/stepper";
import StockTransferService from "Service/Stock/stockTransfer.service";
import AsyncAutoComplete from "../../MUI_components/AutoComplete/asynchronousAutoComplete";

import { currency } from "Components/MUI_components/currencyFormatterTag";
import Loading from "Components/MUI_components/loading";
import { Box } from "@mui/system";
import { NumFormat } from "Components/MUI_components/currencyFormat";
import { LOCAL_STORAGE } from "Components/Constants/LocalStorage";

const StockTransfer = ({ setOpen, code, setSubmitted }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const stockLocations = useSelector((state) => state.location);
  const defaultLocationSelected = useSelector((state) => state.defaultLocation);
  const addingProduct = React.createRef();

  const initCurrentStockValue = {
    quantity: "",
    stock: ""
  };

  const initValues = {
    fromCode: "",
    toCode: "",
    remarks: "",
    stockHistories: [],
  };
  const [initValue, setInitValue] = useState(initValues);
  const [currentStock, setCurrentStock] = useState(initCurrentStockValue);

  const handleStockDataChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    setCurrentStock({
      ...currentStock,
      [name]: value,

    });
  };


  useEffect(() => {
    const getStockTransfer = async () => {
      if (code) {
        try {
          let response = await StockTransferService.get(code);
          // converting NULL value into Empty string
          response = JSON.parse(
            JSON.stringify(response).replace(/:null/gi, ':""')
          );
          setInitValue(response);
        } catch (e) {
          dispatch(openSnackbar(true, "error", e));
        }
      } else {
        setInitValue(initValues)
      }
      setIsLoaded(true);
    };
    getStockTransfer();
  }, [code, dispatch]);
  const Validation = yup.object({
    // fromCode: yup.string().required("This Field is required"),
    toCode: yup.string().required("This Field is required"),
  });


  const [activeStep, setActiveStep] = React.useState(0);

  const getSteps = ["Stock Transfer", "Transfer Data"];
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  { }
  const handleSubmit = async (values) => {
    try {

      if (code)
        await StockTransferService.edit({ ...values }, code);
      else await StockTransferService.create({
        ...values,
        fromCode: localStorage.getItem(LOCAL_STORAGE.BIZX_LOCATION_CODE)//defaultLocationSelected.location.code
      });
      setSubmitted((prev) => !prev);
      setOpen(false);

      dispatch(
        openSnackbar(
          true,
          "success",
          `Stock Transfer ${code ? "updated" : "created"} successfully`
        )
      );
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };
  return (
    <>
      {isLoaded ? (

        <Formik
          initialValues={initValue}
          validationSchema={Validation}
          onSubmit={async (values) => {
            if (activeStep === getSteps.length - 1) {
              await handleSubmit(values);
              console.log(values);
            } else handleNext();
          }}
        >
          {(props) => (
            <Form>
              <Stepper
                getSteps={getSteps}
                StepContent={getStepContent}
                activeStep={activeStep}
                values={props.values}
                setFieldValue={props.setFieldValue}
              />

              {/* 
            Back Button */}
              <div className="row space-between mb">
                <Button
                  disabled={activeStep === 0 || props.isValid === false}
                  onClick={handleBack}
                >
                  Back
                </Button>

                <div style={{ display: "flex" }}>
                  <Button
                    disabled={
                      props.isSubmitting ||
                        (!props.values.stockHistories.length &&
                          activeStep === getSteps.length - 1)
                        ? true
                        : false
                    }
                    startIcon={
                      props.isSubmitting && (
                        <CircularProgress color="inherit" size={20} />
                      )
                    }
                    variant="contained"
                    type="submit"
                    color="secondary"
                  >
                    {activeStep === getSteps.length - 1 ? "Complete" : "Next"}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Loading />
      )}
    </>
  );
  function getStepContent(step, values, setFieldValue) {
    const totalAmount = values.stockHistories
      .map((data) =>
        data.retailPrice * data.quantity)
      .reduce((sum, i) => sum + i, 0);
    switch (step) {
      case 0:
        return (
          <>
            <div className="row">
              <div className="col-6">
                <FormControl
                  disabled={!values.fromCode}
                  options={stockLocations}
                  // value={defaultLocationSelected.location.code}
                  // value={JSON.parse(localStorage.getItem(LOCAL_STORAGE.BIZX_LOCATION)).code}
                  value={localStorage.getItem(LOCAL_STORAGE.BIZX_LOCATION_CODE)}
                  control="select"
                  label="From"
                  name="fromCode"
                />
              </div>
              <div className="col-6">
                <FormControl
                  control="select"
                  label="To"
                  options={stockLocations.filter(
                    (location) => location.code !== localStorage.getItem(LOCAL_STORAGE.BIZX_LOCATION_CODE)
                  )}
                  name="toCode"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <FormControl name="remarks"
                  label="Remarks"
                  control="input" />
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <FieldArray name="stockHistories">
            {(props) => {
              const { push, remove, form } = props;
              const { setFieldValue, values } = props.form;
              const { stockHistories } = form.values;
              return (
                <>
                  <div className="row">

                   
                    <div className="col-4">
                      <NumFormat
                        name="quantity"
                        label="Quantity*"
                        control="currency"
                        value={currentStock.quantity}
                        onChange={handleStockDataChange}
                        variant="outlined"
                      />
                    </div>
                  </div>

                  <div className="row flex-end">
                    <Button
                      variant="contained"
                      disabled={(parseFloat(currentStock.quantity) > parseFloat(currentStock.stock?.remainingQuantity))
                        || !currentStock.stock || !currentStock.quantity}
                      onClick={() => {
                        push({
                          stockCode: currentStock.stock.code,
                          itemMaster: currentStock.stock.itemMaster,
                          costPrice: currentStock.stock.costPrice,
                          retailPrice: currentStock.stock.retailPrice,
                          wholesalePrice: currentStock.stock.wholesalePrice,
                          quantity: currentStock.quantity,
                          discountAmount: 0,
                          discountPercentage: 0,
                          discountTotal: 0,
                        });

                        setCurrentStock(initCurrentStockValue);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="row mt mb">
                    <TableContainer>
                      <Table size="small" aria-label="spanning table">
                        <TableHead style={{ backgroundColor: "#cacaca50" }}>
                          <TableRow>
                            <TableCell align="center" colSpan={5}>
                              Details
                            </TableCell>
                            <TableCell align="right">Price</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell width="5"></TableCell>
                            <TableCell width="5">#</TableCell>
                            <TableCell>Desc</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Retail Price</TableCell>
                            <TableCell align="right">Sum</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.stockHistories.map((row, i) => (
                            <TableRow key={i}>

                              <TableCell width="5">
                                {!code ? (
                                  <Delete
                                    color="secondary"
                                    style={{
                                      fontSize: 18,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Are you sure want to delete this?"
                                        )
                                      )
                                        remove(i);
                                    }}
                                  />
                                )
                                  : (
                                    <></>
                                  )}
                              </TableCell>

                              <TableCell width="5">{i + 1}</TableCell>
                              <TableCell>{row.itemMaster.name}</TableCell>
                              <TableCell align="right">
                                <FormControl
                                  control="customInput"
                                  name={`stockHistories[${i}].quantity`}
                                />
                              </TableCell>
                              <TableCell align="right">
                                {row.retailPrice}
                              </TableCell>

                              <TableCell align="right">
                                {currency(row.quantity * row.retailPrice)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableHead>
                          {values.stockHistories.length === 0 ? (
                            <TableRow>
                              <TableCell align="center" colSpan={6}>
                                No Data
                              </TableCell>
                            </TableRow>
                          ) : (
                            <>
                              <TableRow>
                                <TableCell colSpan={4} />
                                <TableCell>
                                  <strong>Total</strong>
                                </TableCell>
                                <TableCell align="right">
                                  <strong>{currency(totalAmount)}</strong>
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </div>
                </>
              );
            }}
          </FieldArray>
        );
      default:
        return null;
    }
  }
};

export default StockTransfer;
