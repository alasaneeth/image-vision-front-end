import { paymentTypeActionSelectors as selector } from "../Selectors/index";
import { openSnackbar } from "./snackbarActions";
import PaymentTypeService from "../../Service/Payments/paymentType.service";

export const getPaymentType = (paymentType) => {
  return {
    type: selector.GET_PAYMENT_TYPE,
    payload: paymentType,
  };
};

export const fetchPaymentType = () => {
  return async (dispatch) => {
    try {
      const res = await PaymentTypeService.getAll();
      dispatch(getPaymentType(res));
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };
};
