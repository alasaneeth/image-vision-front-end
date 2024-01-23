import { lastInsertInvoice as selector } from "../Selectors/index";

export const LastInsertInvoice = (
  state = {
    code: null,
    date: null,
  },
  { type, payload }
) => {
  switch (type) {
    case selector.GET:
      return payload;

    default:
      return state;
  }
};
