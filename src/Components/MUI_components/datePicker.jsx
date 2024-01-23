import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";

function DatePicker(props) {
  return (
    <LocalizationProvider utils={DateFnsUtils}>
      <DateTimePicker
        id="date-picker-dialog"
        format="dd/MM/yyyy"
        variant="inline"
        inputVariant="outlined"
        {...props}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </LocalizationProvider>
  );
}

export default DatePicker;
