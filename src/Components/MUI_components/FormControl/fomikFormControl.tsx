import React from "react";
import Input from "./Controls/input";
import Select from "./Controls/select";
import Switch from "./Controls/switch";
import AutoComplete from "./Controls/autoComplete";
import Currency from "./Controls/currency";
import Number from "./Controls/number";
import Radio from "./Controls/radio";
import AsynchronousAutoComplete from "./Controls/asynchronousAutoComplete";
import AsynchronousAuto from "./Controls/asynchronousAuto";
import CustomInput from "./Controls/customInput";
import DigitFormat from "./Controls/digit";
import Checkbox from "./Controls/Checkbox";
import Weight from "./Controls/weight";


const FormControl = (props: any) => {
  const { control, ...rest } = props;

  switch (control) {
    case "customInput":
      return <CustomInput {...rest} />;
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "switch":
      return <Switch {...rest} />;
    case "autoComplete":
      return <AutoComplete {...rest} />;
    case "asynchronousAutoComplete":
      return <AsynchronousAutoComplete {...rest} />;
    case "asynchronousAuto":
      return <AsynchronousAuto {...rest} />;
    case "currency":
      return <Currency {...rest} />;
    case "weight":
        return <Weight {...rest} />;
    case "number":
      return <Number {...rest} />;
    case "digit":
      return <DigitFormat {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    default:
      return null;
  }
};
export default FormControl;
