import { userActionSelectors as selector } from "../Selectors/index";
import UserService from "../../Service/Users/user.service";
import AuthService from "../../Service/auth-service";
import { setUserData, checkLoggedIn } from "./authAction";
import { openSnackbar } from "./snackbarActions";

export const getUsers = () => {
  return {
    type: selector.GET_USER,
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: selector.GET_USER_SUCCESS,
    payload: users,
  };
};

export const fetchUser = (val) => {
  return async (dispatch) => {
    dispatch(getUsers());

    try {
      const res =
        val && val !== ""
          ? await UserService.search(val)
          : await UserService.getAll();

      dispatch(getUsersSuccess(res));
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };
};

export const login = (form) => async (dispatch) => {
  return AuthService.signInWithUserAndPassword(form)
    .then((res) => {
      const user = {
        role: [res.role],
        from: "AUTOCARE",
        data: {
          displayName: res.user.displayName,
          location: form.location
        },
      };
      dispatch(setUserData(user));
      return dispatch(checkLoggedIn(true));
    })
    .catch((error) => {
      if (error.message !== undefined) {
        dispatch(checkLoggedIn(false));

        return dispatch(
          openSnackbar(true, "error", "Network error, reload the page.")
        );
      }
      const { loggedInError } = error;
      dispatch(openSnackbar(true, "error", loggedInError));
      return dispatch(checkLoggedIn(false));
    });
};
