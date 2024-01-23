import React from "react";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const Radios = (props: any) => {
  const { name, label, options, ...rest } = props;
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <Field as={RadioGroup} name={name} {...rest}>
          <div className="flex">
            {options.map((option: any, index: number) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
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
export default Radios;
