import { authActionSelectors as selector } from "../Selectors/index";

const initValue = {
  loggedInSuccess: false,
  userData: {
    role: [], // guest
    from: null,
    data: {
      displayName: null,
    },
  },
};

export const authReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case selector.SET_USER_DATA:
      return {
        userData: payload,
      };

    case selector.LOGOUT:
      return initValue;

    case selector.LOGGED_IN_SUCCESS:
      return {
        ...state,
        loggedInSuccess: payload,
      };
    default:
      return state;
  }
};
