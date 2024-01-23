import { paymentTypeActionSelectors as selector } from "../Selectors/index";

export const PaymentTypeReducer = (state = [], { type, payload }) => {
  switch (type) {
    case selector.GET_PAYMENT_TYPE:
      return payload;

    default:
      return state;
  }
};
