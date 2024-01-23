import { Autocomplete, TextField } from "@mui/material";

export default function CustomSelect(props) {
  const { label, error, helperText, value, ...rest } = props;
  return (
    <Autocomplete
      {...rest}
      value={value === "" ? null : value}
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
