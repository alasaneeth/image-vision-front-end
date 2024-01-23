import { userActionSelectors as selector } from "../Selectors/index";
import UserTypeService from "../../Service/Users/usertypes.service";
import { openSnackbar } from "./snackbarActions";
export const getUserTypes = () => {
  return {
    type: selector.GET_USER_TYPES,
  };
};
export const getUserTypesSuccess = (users) => {
  return {
    type: selector.GET_USER_TYPES_SUCCESS,
    payload: users,
  };
};

export const fetchUserTypes = (val) => {
  return async (dispatch) => {
    dispatch(getUserTypes());
    try {
      const res =
        val && val !== ""
          ? await UserTypeService.search(val)
          : await UserTypeService.getAll();
      dispatch(getUserTypesSuccess(res));
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };
};
