import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";

import { openSnackbar } from "../../Redux/Actions/snackbarActions";
import { fetchUserTypes } from "../../Redux/Actions/userTypesAction";

import Service from "../../Service/Users/user.service";
import Loading from "../MUI_components/loading";

import FormControl from "../MUI_components/FormControl/fomikFormControl";

const AddUser = ({ setOpen, code, setSubmitted }) => {
  const dispatch = useDispatch();

  const [initValue, setInitValue] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      dispatch(fetchUserTypes());
      if (code) {
        try {
          let response = await Service.get(code);
          // converting NULL value into Empty string
          response = JSON.parse(
            JSON.stringify(response).replace(/:null/gi, ':""')
          );
          setInitValue(response);
        } catch (e) {
          dispatch(openSnackbar(true, "error", e));
        }
      } else {
        setInitValue({
          userTypeCode: "",
          username: "",
          password: "",
          name: "",
          contactNo: "",
          passportNumber: "",
          nicNumber: "",
          email: "",
          isActive: true,
          isVerified: false,
          address:"",
          remarks: "",
        });
      }
      setIsLoaded(true);
    };

    getUser();
    return () => { };
  }, [code, dispatch]);

  //const userTypes = useSelector((state) => state.userTypes);

  const userTypes = [
    { name: 'admin', code: 0 },
    { name: 'cashier', code: 1 },
  ]

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const Validation = yup.object({
    firstName: yup.string().required("First name is required"),
    userTypeCode: yup.string().required("User type is required"),
    password: yup.string().required(),
    username: yup.string().required(),
    nicNumber: yup.string().min(10).max(12),
    contactNo: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    email: yup.string().email().required(),
  });

  const handleSubmit = async (values) => {
    try {
      if (code) {
        await Service.edit(values, code);
      } else await Service.create(values);
      setSubmitted((prev) => !prev);
      dispatch(
        openSnackbar(
          true,
          "success",
          `User ${code ? "updated" : "created"} successfully`
        )
      );
      setOpen(false);
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };

  return (
    <>
      {isLoaded ? (
        <Formik
          initialValues={initValue}
          //validationSchema={Validation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <div className="row mt">
                <div className="col-6">
                  <FormControl
                    control="input"
                    name="name"
                    label="Name"
                  />
                </div>
                <div className="col-6">

                  <FormControl
                    control="autoComplete"
                    name="userType"
                    label="User Type"
                    getOptionLabel={(option) =>
                      option.name
                    }
                    options={userTypes}
                  />
                </div>
                
              </div>
              <div className="row">
              <div className="col-4">
                  <FormControl
                    control="input"
                    name="username"
                    label="User Name"
                  />
                </div>
                <div className="col-4">
                  <FormControl
                    control="input"
                    name="password"
                    label="Password"
                    type={showPass ? "text" : "password"}
                  />
                  </div>
                  <div className="col-4">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showPass}
                        onChange={() => setShowPass(!showPass)}
                      />
                    }
                    label="Show Password"
                  />
                  </div>
                 
              </div>

              <div className="row">
                <div className="col-4">
                  <FormControl control="input" name="email" label="Email" />
                </div>
                <div className="col-4">
                  <FormControl control="input" name="contactNo" label="Contact" />
                </div>
                <div className="col-4">
                  <FormControl
                    control="input"
                    name="nicNumber"
                    label="NIC Number"
                  />
                </div>
              </div>
              <div className="row">
              
                <div className="col-6">
                  <FormControl control="input" name="address" label="Address" />
                </div>
                <div className="col-6">
                  <FormControl control="input" name="remarks" label="Remarks" />
                </div>
              </div>

              <div className="row">
                {code && (
                  <FormControl
                    control="switch"
                    name="isActive"
                    label="Active"
                  />
                )}
              </div>

              <div className="row flex-end mb">
                <Button
                  type="submit"
                  style={{ marginRight: 5 }}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting && (
                      <CircularProgress color="inherit" size={20} />
                    )
                  }
                >
                  {code ? "Update" : "Save"}
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AddUser;
