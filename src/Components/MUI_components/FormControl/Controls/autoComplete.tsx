import React from "react";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

export default function AutoCompletes(props: any) {
  const { label, name, variant, getOptionLabel, onChange, ...rest } = props;
  return (
    <Field name={name}>
      {(fieldProps: any) => {
        const { setFieldValue, values } = fieldProps.form;

        return (
          <>
            <Autocomplete
              {...rest}
              getOptionLabel={
                getOptionLabel ? getOptionLabel : (option: any) => option.name
              }
              onChange={
                onChange
                  ? onChange
                  : (event, newValue) => setFieldValue(name, newValue)
              }
              value={values[name] === "" ? null : values[name]}
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  variant={variant ? variant : `outlined`}
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
