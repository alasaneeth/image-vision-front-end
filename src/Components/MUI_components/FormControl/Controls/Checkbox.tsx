import React from "react";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { Checkbox, FormControl, FormControlLabel, FormLabel } from "@mui/material";

const Checkboxes = (props: any) => {
  const { name, label, options, ...rest } = props;
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <Field  name={name} {...rest}>
          <div className="flex">
            {options.map((option: any, index: number) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Checkbox />}
                label={option.label}
              />
            ))}
          </div>
        </Field>
      </FormControl>
      <ErrorMessage name={name} component={Error} />
    </>
  );
};
export default Checkboxes;
