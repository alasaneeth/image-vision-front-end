import React, { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { CircularProgress, TextField } from "@mui/material";

export default function Asynchronous(props) {
  const { getOptionLabel, Service, value, inputProps, variant, ...rest } =
    props;

  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleInputValueChange = (e, newValue) => {
    setInputValue(newValue);
    newValue.length > 0 ? setLoading(true) : setOptions([]);
    newValue.length >= 3 &&
      newValue.length <= 12 &&
      (async () => {
        const response = await Service(newValue);
        setOptions(response);
        setLoading(false);
      })();
  };

  useEffect(() => {
    open && options.length === 0 && setLoading(true);
  }, [open, options.length]);

  return (
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
      value={value === "" ? null : value}
      getOptionLabel={
        getOptionLabel
          ? getOptionLabel
          : (option) => option.name + " | " + option.barcode
      }
      {...rest}
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={handleInputValueChange}
      renderInput={(params) => (
        <TextField
          {...params}
          {...inputProps}
          variant={variant ? variant : "outlined"}
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
  );
}