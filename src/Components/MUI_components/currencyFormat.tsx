import { InputAdornment, TextField } from "@mui/material";
import NumberFormat from "react-number-format";


export const CurrencyFormat = (props:any) => {
  const currency_type = "LKR ";

  return (
    <NumberFormat
      customInput={TextField}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{currency_type}</InputAdornment>
        ),
      }}
      thousandSeparator
      fixedDecimalScale
      {...props}
    />
  );
};
export const NumFormat = (props:any) => {
  return (
    <NumberFormat
      customInput={TextField}
      variant="outlined"
      allowNegative={false}
      {...props}
    />
  );
};
