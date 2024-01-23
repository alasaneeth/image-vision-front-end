import { customerTypeActionSelectors as selector } from "../Selectors/index";

export const customerTypeReducer = (state = [], { type, payload }) => {
  switch (type) {
    case selector.GET:
      return payload;

    default:
      return state;
  }
};
