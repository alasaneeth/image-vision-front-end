import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const Selects = (props) => {
  const { options, ...rest } = props;
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="age-native-simple">{props.label}</InputLabel>
      <Select {...rest}>
        {options &&
          options.map((option, index) => (
            <MenuItem key={index} value={option.code}>
              {option.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default Selects;
