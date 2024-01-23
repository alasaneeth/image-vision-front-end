import NumberFormat from "react-number-format";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { TextField } from "@mui/material";

export default function Number(props:any) {
  const { name, ...rest } = props;

  return (
    <>
      <Field name={name}>
        {(fieldProps:any) => {
          const { setFieldValue, values } = fieldProps.form;

          return (
            <NumberFormat
              customInput={TextField}
              value={values[name]}
              onValueChange={(val) => setFieldValue(name, val.floatValue)}
              variant="outlined"
              allowNegative={false}
              {...rest}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={Error} />
    </>
  );
}
