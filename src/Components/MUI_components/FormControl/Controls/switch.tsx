import React from "react";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { Switch } from "@mui/material";

const Switches = (props:any) => {
  const { name, label, ...rest } = props;
  return (
    <>
      <label>{label}</label>
      <Field name={name}>
        {(props:any ) => {
          const {field} = props;
          return(
          <Switch
            {...rest}
            checked={Boolean(field.value)}
            {...field}
            value={Boolean(field.value)}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        )}}
      </Field>
      <ErrorMessage name={name} component={Error} />
    </>
  );
};
export default Switches;
