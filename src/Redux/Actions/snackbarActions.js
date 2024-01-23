import { snackbarActionSelectors as selector } from "../Selectors/index";
export const openSnackbar = (open, type, msg) => {
  return {
    type: selector.OPEN_SNACKBAR,
    payload: {
      open: open,
      type: type,
      message: msg,
    },
  };
};
