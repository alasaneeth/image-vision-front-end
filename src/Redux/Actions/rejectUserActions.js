import { rejectUserActionSelectors as selector } from "../Selectors/index";
import RejectUserService from "../../Service/Permission/rejectUser.service";
import { openSnackbar } from "./snackbarActions";

export const getRejectUser = () => {
  return {
    type: selector.GET_REJECT_USER,
  };
};

export const getRejectUserSuccess = (rejectUser) => {
  return {
    type: selector.GET_REJECT_USER_SUCCESS,
    payload: rejectUser,
  };
};

export const fetchRejectUser = (val) => {
  return async (dispatch) => {
    dispatch(getRejectUser());
    try {
      const res =
        val && val !== ""
          ? await RejectUserService.search(val)
          : await RejectUserService.getAll();
      dispatch(getRejectUserSuccess(res));
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };
};
