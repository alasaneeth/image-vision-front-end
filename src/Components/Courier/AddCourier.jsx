import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../Redux/Actions/snackbarActions";
import Loading from "../MUI_components/loading";
import FormControl from "../MUI_components/FormControl/fomikFormControl";
import CustomerService from "../../Service/Customer/customer.service";
import { useQuery } from "react-query";
import { REACT_QUERY_KEYS } from "Components/Constants/ReactQueryKeys";
import ErrorMessage from "Components/MUI_components/ErrorMessage";
import { CUSTOMER_CONST } from "Components/Constants/CustomerContsnt";
import courierService from "Service/Courier/courier.service";

const AddCustomer = (props) => {
  const { setOpen, code, setSubmitted } = props;
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = React.useState(false);

  const [clickSave, setClickSave] = useState(false);
  const initValue = {
    name: "",
    contactNo: "",
    nic: "",
    address: ""
  };

    const Validation = yup.object({
      name: yup.string().required("Name is required"),
      contactNo: yup.string().required("First Name is required"),
      nic: yup.string().required("Nic is required"),
      address: yup.string().required("Address is required"),
    });

  const handleSubmit = async (values) => {
    setClickSave(true);
    try {
      if (code) {
        await courierService.edit(values, code);
        setSubmitted((prev) => !prev);
        setOpen(false);
        dispatch(
          openSnackbar(
            true,
            "success",
            `Courier updated successfully`
          )
        );

      } else {
        await courierService.create(values);
        setSubmitted((prev) => !prev);
        setOpen(false);
        dispatch(
          openSnackbar(
            true,
            "success",
            `Courier created successfully`
          )
        );
      }

    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
    setClickSave(false);
  };



  const { isSuccess, isError, isLoading, data } = useQuery(
    [REACT_QUERY_KEYS.ADD_COURIER, code],
    () => courierService.get(code),
    {
      enabled: !!code,
      initialData: initValue
    }
  )

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <ErrorMessage />
  }

  return (
    <>
      <Formik
        initialValues={initValue}
        enableReinitialize={true}
         validationSchema={Validation}
        onSubmit={async (values) => {
          await handleSubmit(values)
        }
        }
      >
        {(props) => (
          <Form autoComplete="off">
            <>
              <div className="row">
                <div className="col-4">
                  <FormControl
                    control="input"
                    name="name"
                    label="Courier name"

                  />
                </div>
                <div className="col-4">
                  <FormControl
                    control="input"
                    name="contactNo"
                    label="Contact No"
                  />
                </div>
                <div className="col-4">
                  <FormControl
                    control="input"
                    name="nic"
                    label="NIC"
                  />
                </div>

              </div>
              <div>
                <div className="row">
                  <div className="col-12">
                    <FormControl
                      control="input"
                      name="address"
                      label="Address"
                    />
                  </div>
                </div>
              </div>
            </>
            <div className="row flex-end mb">
              <div style={{ display: "flex" }}>
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                >
                  save
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

    </>
  );
};

export default AddCustomer;