import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch,useSelector } from "react-redux";
import { useQuery } from "react-query";
import { REACT_QUERY_KEYS } from "Components/Constants/ReactQueryKeys";
import ErrorMessage from "Components/MUI_components/ErrorMessage";
import { openSnackbar } from "Redux/Actions/snackbarActions";
import FormControl from "Components/MUI_components/FormControl/fomikFormControl";
import Loading from "Components/MUI_components/loading";
import RouteService from "Service/Courier/route.service";
import customerService from "Service/Customer/customer.service";
import { Input, InputLabel } from "@mui/material";
import ParcelServiceService from "Service/Parcel/ParcelService.service";
import { LOCAL_STORAGE } from "Components/Constants/LocalStorage";
import routeService from "Service/Courier/route.service";

const AddCustomer = (props) => {
  const { setOpen, code, setSubmitted } = props;
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = React.useState(false);

  const stockLocations = useSelector((state) => state.location);

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
    const formData = new FormData();
    formData.append('customer', values.customer.code);
    formData.append('weight', values.weight);
    formData.append('image', values.image);
    formData.append('fromLocation', localStorage.bizx_location_code);
    formData.append('toLocation', values.toLocation);
    formData.append('route', values.route.code);
    try {
    
      const response = await  ParcelServiceService.create(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        setSubmitted((prev) => !prev);
        setOpen(false);
        dispatch(
          openSnackbar(
            true,
            "success",
            `Parcel created successfully`
          )
        );
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
        // validationSchema={Validation}
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
                    control="asynchronousAutoComplete"
                    name="customer"
                    label="Customer"
                    Service={customerService}
                    getOptionLabel={(option) =>
                      option.firstName + option.lastName
                  
                    }
                  />
                </div>
                <div className="col-6">
                  <FormControl
                    control="weight"
                    name="weight"
                    label="Weight"

                  />
                </div>
               
              </div>
             
             

              <div className="row">
              <div className="col-6">
                <FormControl
                  disabled={!props.values.fromCode}
                  options={stockLocations}
                  // value={defaultLocationSelected.location.code}
                  // value={JSON.parse(localStorage.getItem(LOCAL_STORAGE.BIZX_LOCATION)).code}
                  value={localStorage.getItem(LOCAL_STORAGE.BIZX_LOCATION_CODE)}
                  control="select"
                  label="From"
                  name="fromLocation"
                />
              </div>
              <div className="col-6">
                <FormControl
                  control="select"
                  label="To"
                  options={stockLocations.filter(
                    (location) => location.code !== localStorage.getItem(LOCAL_STORAGE.BIZX_LOCATION_CODE)
                  )}
                  name="toLocation"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <FormControl
                    control="asynchronousAutoComplete"
                    name="route"
                    label="Route"
                    Service={routeService}
                    getOptionLabel={(option) =>
                      option.routeName
                  
                    }
                  />
                </div>
                <div className="col-6">
                <InputLabel htmlFor="image">Image</InputLabel>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={(event) => props.setFieldValue('image', event.currentTarget.files[0])}
                inputProps={{ accept: 'image/*' }}
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