import React from "react";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { TextField } from "@mui/material";

const Input = (props: any) => {
  const { name, ...rest } = props;
  return (
    <>
      <Field
        {...rest}
        name={name}
        as={TextField}
        fullWidth
        variant="outlined"
      />
      <Error>
        <ErrorMessage name={name} />
      </Error>
    </>
  );
};
export default Input;
