import NumberFormat from "react-number-format";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { InputAdornment, TextField } from "@mui/material";
import { SETTING } from "Components/Constants/Setting";

export default function CurrencyFormat(props: any) {
  const { name, nested = false, ...rest } = props;

  const getNestedName = () => name.split(".");

  return (
    <>
      <Field name={name}>
        {(fieldProps: any) => {
          const { setFieldValue, values } = fieldProps.form;
          return (
            <NumberFormat
              customInput={TextField}
              value={
                nested
                  ? values[getNestedName()[0]][getNestedName()[1]]
                  : values[name]
              }
              onValueChange={(val) => setFieldValue(name, val.floatValue)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {SETTING.CURRENCY_SHORT_CODE}
                  </InputAdornment>
                ),
              }}
              thousandSeparator
              fixedDecimalScale
              {...rest}
            />
          );
        }}
      </Field>
      <Error>
        <ErrorMessage name={name} />
      </Error>
    </>
  );
}
