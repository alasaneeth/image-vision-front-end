import { snackbarActionSelectors as selector } from "../Selectors/index";

const initValue = {
  open: false,
  type: "success",
  message: "",
};

export const snackbarReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case selector.OPEN_SNACKBAR:
      return payload;

    default:
      return state;
  }
};
