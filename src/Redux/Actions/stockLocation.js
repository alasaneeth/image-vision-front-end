import { stockLocationActionSelectors as selector } from "../Selectors/index";
import { openSnackbar } from "./snackbarActions";
import Service from "../../Service/Stock/stockLocation.service";

export const getStockLocation = (location) => {
  return {
    type: selector.GET,
    payload: location,
  };
};

export const fetchStockLocation = () => {
  return async (dispatch) => {
    try {
      const res = await Service.getAll();
      dispatch(getStockLocation(res));
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };
};
