import FormControl from "../../../MUI_components/FormControl/fomikFormControl";
import { Form, Formik } from "formik";
import React, {useEffect, useRef} from "react";
import reportsService from "Service/Reports/reports.service";
import ReactToPrint from "react-to-print";
import { pageStyle } from "../../../Print/printPagesStyles";
import BasicTable from "../../../MUI_components/Table/basicTable";
import ReportPrintTable from "../../reportPrintTable";
import { Button, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../../Redux/Actions/snackbarActions";
import * as yup from "yup";
import Reports from "Components/Print/a4-report-print";
import customerService from "Service/Customer/customer.service";

import { COLUMNS_NAME } from "Components/Constants/ColumnsNames";
import { DownloadTableExcel } from "react-export-table-to-excel";

export default function ListOfCustomer() {
  const dispatch = useDispatch();
  const [listOfCustomer, setListOfCustomer] = React.useState({
    rows: [],
    status: null,
    loading: false,
  });
  const tableRef = useRef(null);

  const HeadCells = [
    {
      key: (val) => {
        return val["code"];
      },
      align: "left",
      label: COLUMNS_NAME.CODE,
    },
    {
      key: (val) => {
        return val["firstName"];
      },
      align: "left",
      label: COLUMNS_NAME.CUSTOMER_NAME,
    },
    {
      key: (val) => {
        return val["phone1"];
      },
      align: "center",
      label: COLUMNS_NAME.TEL+"1",
    },
    {
      key: (val) => {
        return val["phone2"];
      },
      align: "center",
      label: COLUMNS_NAME.TEL +"2",
    },
    {
      key: (val) => {
        return val["isActive"] ? "Active" : "Inactive";
      },
      align: "center",
      label: "Status",
    },
    {
      key: (val) => {
        return val["creditDays"];
      },
      align: "right",
      label: "Credit Due Days",
    },
  ];
  const componentRef = React.useRef();
  // useEffect(() => {
  //   const fetchCustomers = async (values) => {
  //     setListOfCustomer({
  //       ...listOfCustomer,
  //       loading: true,
  //     });
  //     try {
  //       const res = await customerService.getAll();
  //       setListOfCustomer({
  //         loading: false,
  //         rows: res,
  //       });
  //     } catch (e) {
  //       dispatch(openSnackbar(true, "error", e));
  //     }
  //   };
  //   fetchCustomers();
  // }, []);

  //const componentRef = React.useRef();
  const handleSubmit = async (values) => {
    setListOfCustomer({
      ...listOfCustomer,
      loading: true,
    });
    try {
      const res = await reportsService.customerList(values.customer?.code);
      // console.log(res);
      setListOfCustomer({
        loading: false,
        rows: res.customerlist,
        customer: values.customer,
      });
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };

 // const billTotal = cheques.rows
  //.map((props) => parseFloat(props["total"]))
 // .reduce((sum, i) => sum + i, 0);

  // const Validation = yup.object({
  //   customer: yup.object().required("Customer is Required").nullable(),
  // });


  return (
    <div>
      <Formik
        initialValues={{
          Customer: "",
        }}
       // validationSchema={Validation}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form>
              <div className="flex mt mb">
                <div className="col-4">
                  <FormControl
                    control="asynchronousAutoComplete"
                    name="customer"
                    size="small"
                    label="Customer"
                    Service={customerService}
                    getOptionLabel={(option) =>
                      option.firstName +
                      " " +
                      option.code
                    }
                  />
                </div>
                <div className="col-6">
                  <Button variant="contained" 
                  type="submit" 
                  color="primary">
                    Find
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      
 
      <Paper>
        <div className="flex-end">
          <ReactToPrint
            trigger={() => (
              <Button
                style={{ margin: 5 }}
                disabled={!listOfCustomer.rows.length}
                variant="contained"
              >
                Print
              </Button>
            )}
            content={() => componentRef.current}
            pageStyle={pageStyle.a4}
          />
           
             <DownloadTableExcel
            filename="Customer List"
            currentTableRef={tableRef.current}
          >
            <Button
              style={{ margin: 5 }}
              disabled={!listOfCustomer.rows.length}
              variant="contained"
            >
              Export to Excel </Button>
          </DownloadTableExcel>
        </div>
        <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <Reports title={`Customers List - ${listOfCustomer.customers}`}>
              <ReportPrintTable
                headCells={HeadCells}
                rows={listOfCustomer.rows}
              />
            </Reports>
          </div>
        </div>

        <BasicTable
          headCells={HeadCells}
          rows={listOfCustomer.rows}
          isLoaded={listOfCustomer.loading}
          tableRef={tableRef}

        />
      </Paper>
    </div>
  );
}
