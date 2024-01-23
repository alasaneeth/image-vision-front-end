import { activeUserActionSelectors as selector } from "../Selectors/index";
import ActiveUserService from "../../Service/Permission/activeUser.service";
import { openSnackbar } from "./snackbarActions";

export const getActiveUser = () => {
  return {
    type: selector.GET_ACTIVE_USER,
  };
};

export const getActiveUserSuccess = (activeUser) => {
  return {
    type: selector.GET_ACTIVE_USER_SUCCESS,
    payload: activeUser,
  };
};

export const fetchActiveUser = (val) => {
  return async (dispatch) => {
    dispatch(getActiveUser());
    try {
      const res =
        val && val !== ""
          ? await ActiveUserService.search(val)
          : await ActiveUserService.getAll();
      dispatch(getActiveUserSuccess(res));
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };
};
