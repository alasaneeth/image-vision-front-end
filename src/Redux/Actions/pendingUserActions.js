import { pendingUserActionSelectors as selector } from "../Selectors/index";
import PendingUserService from "../../Service/Permission/pendingUser.service";
import { openSnackbar } from "./snackbarActions";

export const getPendingUser = () => {
  return {
    type: selector.GET_PENDING_USER,
  };
};

export const getPendingUserSuccess = (pendingUser) => {
  return {
    type: selector.GET_PENDING_USER_SUCCESS,
    payload: pendingUser,
  };
};

export const fetchPendingUser = (val) => {
  return async (dispatch) => {

    dispatch(getPendingUser());
    try {

      const res =
        val && val !== ""
          ? await PendingUserService.search(val)
          : await PendingUserService.getAll();
      dispatch(getPendingUserSuccess(res));
      
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    
    }
  };
};
