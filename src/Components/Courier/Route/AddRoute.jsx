import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { REACT_QUERY_KEYS } from "Components/Constants/ReactQueryKeys";
import ErrorMessage from "Components/MUI_components/ErrorMessage";
import { CUSTOMER_CONST } from "Components/Constants/CustomerContsnt";
import courierService from "Service/Courier/courier.service";
import { openSnackbar } from "Redux/Actions/snackbarActions";
import FormControl from "Components/MUI_components/FormControl/fomikFormControl";
import Loading from "Components/MUI_components/loading";
import RouteService from "Service/Courier/route.service";

const AddCustomer = (props) => {
  const { setOpen, code, setSubmitted } = props;
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = React.useState(false);

  const [clickSave, setClickSave] = useState(false);
  const initValue = {
    routeName: "",
    courier: "",
    from: "",
    to: "",
   
  };
 


    const Validation = yup.object({
      routeName: yup.string().required("Route  Name is required"),
      from: yup.string().required("From Location is required"),
      to: yup.string().required("To location Name is required"),

    });

  const handleSubmit = async (values) => {
    setClickSave(true);
    try {
      if (code) {
        await RouteService.edit(values, code);
        setSubmitted((prev) => !prev);
        setOpen(false);
        dispatch(
          openSnackbar(
            true,
            "success",
            `Route updated successfully`
          )
        );

      } else {
        await RouteService.create(values);
        setSubmitted((prev) => !prev);
        setOpen(false);
        dispatch(
          openSnackbar(
            true,
            "success",
            `Route created successfully`
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
    () => RouteService.get(code),
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
          await handleSubmit(values)
        }
        }
      >
        {(props) => (
          <Form autoComplete="off">
            <>
              <div className="row">
                <div className="col-6">
                  <FormControl
                    control="input"
                    name="routeName"
                    label="Route Name"

                  />
                </div>
                <div className="col-6">
                <FormControl
                    control="asynchronousAutoComplete"
                    name="courier"
                    label="Courier"
                    Service={courierService}
                    getOptionLabel={(option) =>
                      option.name
                  
                    }
                  />
                </div>
              </div>
              <div>
                <div className="row">
                  <div className="col-6">
                    <FormControl
                      control="input"
                      name="from"
                      label="From"
                    />
                  </div>
                  <div className="col-6">
                    <FormControl
                      control="input"
                      name="to"
                      label="To"
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
                  disabled={!props.values.courier}
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