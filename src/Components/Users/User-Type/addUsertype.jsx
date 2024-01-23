import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { openSnackbar } from "../../../Redux/Actions/snackbarActions";
import { fetchUserTypes } from "../../../Redux/Actions/userTypesAction";
import Loading from "../../MUI_components/loading";
import UsertypeService from "../../../Service/Users/usertypes.service";
// import { menuConfig } from "../../menu";
// import BasicTable from "../../MUI_components/Table/userAuthTable";

const AddUserType = ({ setOpen, code }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserType = async () => {
      if (code) {
        try {
          let response = await UsertypeService.get(code);
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
          name: "",
        });
      }
      setIsLoaded(true);
    };
    getUserType();
  }, [code, dispatch]);

  const [initValue, setInitValue] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const Validation = yup.object({
    name: yup.string().required(),
  });

  const handleSubmit = async (values) => {
    try {
      if (code) await UsertypeService.edit(values, code);
      else await UsertypeService.create(values);
      dispatch(fetchUserTypes());
      setOpen(false);
      dispatch(
        openSnackbar(
          true,
          "success",
          `User Type ${code ? "updated" : "created"} successfully`
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
            await handleSubmit(values);
          }}
        >
          {({ touched, errors, isSubmitting, setFieldValue, values }) => (
            <Form autoComplete="off">
              <div className="row mt">
                <div className="col-12">
                  <Field
                    as={TextField}
                    name="name"
                    label="User Type"
                    error={touched.name && errors.name && true}
                    helperText={
                      touched.name && errors.name && "This Field is required."
                    }
                    variant="outlined"
                  />
                </div>
                <div className="col-12 mb">
                  <Typography
                    variant="body1"
                    style={{ marginBottom: 10 }}
                    color="secondary"
                  >
                    Customize user authorization level.
                  </Typography>
                  {/* <MenuView /> */}
                  {/* <BasicTable components={menuConfig.menus} /> */}
                </div>
              </div>

              {/* <div className="row">
                {code && (
                  <>
                    <label>Active</label>
                    <Field name="is_active">
                      {({ field }) => {
                        return (
                          <Switch
                            checked={Boolean(field.value)}
                            {...field}
                            value={Boolean(field.value)}
                            color="primary"
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        );
                      }}
                    </Field>
                  </>
                )}
              </div> */}

              <div className="row flex-end mb">
                <div style={{ display: "flex" }}>
                  <Button
                    type="submit"
                    style={{ marginRight: 5 }}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting ? true : false}
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

export default AddUserType;
