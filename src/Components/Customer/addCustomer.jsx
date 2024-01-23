import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch,useSelector } from "react-redux";
import { openSnackbar } from "../../Redux/Actions/snackbarActions";
import Loading from "../MUI_components/loading";
import FormControl from "../MUI_components/FormControl/fomikFormControl";
import CustomerService from "../../Service/Customer/customer.service";
import { useQuery } from "react-query";
import { REACT_QUERY_KEYS } from "Components/Constants/ReactQueryKeys";
import ErrorMessage from "Components/MUI_components/ErrorMessage";
import { CUSTOMER_CONST } from "Components/Constants/CustomerContsnt";

const AddCustomer = (props) => {
  const { setOpen, code, setSubmitted } = props;
  const dispatch = useDispatch();
 // const [isLoaded, setIsLoaded] = React.useState(false);

  const [clickSave, setClickSave] = useState(false);
  const initValue = {
    firstName:"",
    lastName:"",
    phone:"",
    address:""
  
  };




  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // validation Schema for first step
  const Validation = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone Number is Required.."),
    address: yup.string().required("Address is required"),

  });

  const handleSubmit = async (values) => {
    setClickSave(true);
    try {
      if (code){
          if(code == CUSTOMER_CONST.CASH_CUSTOMER){
            alert("Can't Edit Cash Customer")
          }else {
            await CustomerService.edit(values, code);
            setSubmitted((prev) => !prev);
            setOpen(false);
            dispatch(
              openSnackbar(
                true,
                "success",
                `Customer updated successfully`
              )
            );
          }
      }else {
        await CustomerService.create(values);
        setSubmitted((prev) => !prev);
        setOpen(false);
        dispatch(
          openSnackbar(
            true,
            "success",
            `Customer created successfully`
          )
        );
      }
     
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
    setClickSave(false);
  };



  const { isSuccess, isError, isLoading, data } = useQuery(
    [REACT_QUERY_KEYS.ADD_CUSTOMER, code],
    () => CustomerService.get(code),
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
        initialValues={data}
        enableReinitialize={true}
        validationSchema={Validation}
        onSubmit={async (values) => {
          await handleSubmit(values)}
        }
      >
        {(props) => (
          <Form autoComplete="off">
          <>
            <div className="row">
              <div className="col-4">
                <FormControl
                  control="input"
                  name="firstName"
                  label="First Name"

                />
              </div>
              <div className="col-4">
                <FormControl
                  control="input"
                  name="lastName"
                  label="Last Name"
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
            <div className="row">
              <div className="col-4">
                <FormControl
                  control="input"
                  name="phone"
                  label="Mobile No"

                />
              </div>
              <div className="col-8">
                <FormControl
                  control="input"
                  name="address"
                  label="Address"
                 
                />
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