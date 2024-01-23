import { customerTypeActionSelectors as selector } from "../Selectors/index";
import { openSnackbar } from "./snackbarActions";
import Service from "../../Service/Customer/customeType.service";

export const getCustomerType = (customerType) => {
  return {
    type: selector.GET,
    payload: customerType,
  };
};

export const fetchCustomerType = () => {
  return async (dispatch) => {
    try {
      const res = await Service.getAll();
      dispatch(getCustomerType(res));
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };
};
