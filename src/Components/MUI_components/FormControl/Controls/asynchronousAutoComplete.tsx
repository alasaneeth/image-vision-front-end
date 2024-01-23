import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { CircularProgress, TextField } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";

export default function AsynchronousAutoComplete(props: any) {
  const { getOptionLabel, label, name, Service, onChange, ...rest } = props;

  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleInputValueChange = (e: any, newValue: any) => {
    setInputValue(newValue);
    newValue.length > 0 ? setLoading(true) : setOptions([]);
    newValue.length >= 3 &&
      newValue.length <= 12 &&
      (async () => {
        const response = await Service.search(newValue);
        setOptions(response);
        setLoading(false);
      })();
  };

  useEffect(() => {
    open && options.length === 0 && setLoading(true);
  }, [open, options.length]);

  return (
    <Field name={name}>
      {(fieldProps: any) => {
        const { setFieldValue, values } = fieldProps.form;

        return (
          <>
            <Autocomplete
              autoHighlight
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              onOpen={() => {
                setOpen(true);
              }}
              clearOnEscape
              value={values[name] === "" ? null : values[name]}
              getOptionLabel={
                getOptionLabel
                  ? getOptionLabel
                  : (option: any) => option.name + (option.barcode ? + " | " + option.barcode : "" ) 
              }
              {...rest}
              onChange={
                onChange
                  ? onChange
                  : (event, newValue) => setFieldValue(name, newValue)
              }
              options={options}
              loading={loading}
              inputValue={inputValue}
              onInputChange={handleInputValueChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={label}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading && open ? (
                          <CircularProgress color="inherit" size={15} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            <ErrorMessage name={name} component={Error} />
          </>
        );
      }}
    </Field>
  );
}
