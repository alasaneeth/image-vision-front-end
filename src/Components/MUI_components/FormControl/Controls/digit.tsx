import NumberFormat from "react-number-format";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";
import { InputAdornment, TextField } from "@mui/material";
import { SETTING } from "Components/Constants/Setting";

export default function DigitFormat(props: any) {
    const { name, ...rest } = props;

    return (
        <>
            <Field name={name}>
                {(fieldProps: any) => {
                    const { setFieldValue, values } = fieldProps.form;
                    return (
                        <NumberFormat
                            customInput={TextField}
                            value={values[name]}
                            onValueChange={(val) => 
                                setFieldValue(name, val.floatValue)}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
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
