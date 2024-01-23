import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import FormControl from "Components/MUI_components/FormControl/fomikFormControl";
import Loading from "Components/MUI_components/loading";
import { openSnackbar } from "Redux/Actions/snackbarActions";
import LocationService from "Service/Stock/stockLocation.service";

const AddLocation = ({ setOpen, code, setSubmitted }) => {
  const dispatch = useDispatch();
  const Validation = yup.object({
    name: yup.string().required(),
  });

  const [initValue, setInitValue] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getUnit = async () => {
      if (code) {
        try {
          let response = await LocationService.get(code);
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
    getUnit();
  }, [code, dispatch]);

  const handleSubmit = async (values) => {
    try {
      if (code) await LocationService.edit(values, code);
      else await LocationService.create(values);
      setSubmitted((prev) => !prev);
      setOpen(false);
      dispatch(
        openSnackbar(
          true,
          "success",
          `Item Unit ${code ? "updated" : "created"} successfully`
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
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              <div className="mt row">
                <FormControl
                  control="input"
                  autoFocus
                  name="name"
                  label="Location"
                />
              </div>
              <div className="mb row flex-end">
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

export default AddLocation;
