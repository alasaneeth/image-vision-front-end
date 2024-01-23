import React from "react";
import { Field, ErrorMessage } from "formik";
import Error from "./ErrorMessage";

const CustomInput = (props: any) => {
  const { name, ...rest } = props;
  return (
    <>
      <Field
        name={name}
        type="number"
        style={{ fontSize: 12, width: 80, maxWidth: 200 }}
        step="any"
        {...rest}
        className="custom-input"
      />

      <Error>
        <ErrorMessage name={name} />
      </Error>
    </>
  );
};
export default CustomInput;
