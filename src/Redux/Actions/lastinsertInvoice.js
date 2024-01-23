import { lastInsertInvoice as selector } from "../Selectors/index";

export const getLastInsertInvoice = (data) => {
  return {
    type: selector.GET,
    payload: data,
  };
};
