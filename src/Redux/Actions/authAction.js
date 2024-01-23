import { authActionSelectors as selector } from "../Selectors";
import history from "../../@history";
import authService from "../../Service/auth-service";
import { openSnackbar } from "./snackbarActions";

export const logoutUser = () => async (dispatch, getState) => {
  const { userData } = getState().auth;

  if (!userData.role || userData.role.length === 0) {
    return null;
  }

  history.push({
    pathname: "/",
  });

  authService.logout();
  dispatch(openSnackbar(true, "success", "Logged out"));
  return dispatch(userLoggedOut());
};

export const setUserData = (userData) => {
  return {
    type: selector.SET_USER_DATA,
    payload: userData,
  };
};

export const userLoggedOut = () => {
  return {
    type: selector.LOGOUT,
  };
};

export const checkLoggedIn = (payload) => {
  return {
    type: selector.LOGGED_IN_SUCCESS,
    payload: payload,
  };
};
