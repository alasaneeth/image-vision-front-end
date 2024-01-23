import { stockLocationActionSelectors as selector } from "../Selectors/index";

export const StockLocationReducer = (state = [], { type, payload }) => {
  switch (type) {
    case selector.GET:
      return payload;

    default:
      return state;
  }
};
