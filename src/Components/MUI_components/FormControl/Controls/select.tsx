import React from "react";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectInput = (props: any) => {
  const { options, label, name, ...rest } = props;
  // return (
  //   <>
  //     <FormControl variant="outlined">
  //       <InputLabel>{label}</InputLabel>
  //       <Field as={Select} {...rest} name={name}>
  //         {options &&
  //           options.map((option: any, index: number) => (
  //             <MenuItem
  //               key={index}
  //               value={option.code ? option.code : option.name}
  //             >
  //               {option.name}
  //             </MenuItem>
  //           ))}
  //       </Field>
  //     </FormControl>
  //     <ErrorMessage name={name} component={Error} />
  //   </>
  // );
  return (
    <>
      <FormControl fullWidth {...rest}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Field
          as={Select}
          {...rest}
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
        >
          {options &&
            options.map((option: any, index: number) => (
              <MenuItem
                key={index}
                value={option.code ? option.code : option.name}
              >
                {option.name}
              </MenuItem>
            ))}
        </Field>
      </FormControl>
      <ErrorMessage name={name} component={Error} />
    </>
  );
};

export default SelectInput;
