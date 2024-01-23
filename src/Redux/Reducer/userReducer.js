import { userActionSelectors } from "../Selectors/index";

const initValue = {
  loading: false,
  rows: [],
};

export const userReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case userActionSelectors.GET_USER:
      return {
        ...state,
        loading: true,
      };
    case userActionSelectors.GET_USER_SUCCESS:
      return {
        loading: false,
        rows: payload,
      };

    default:
      return state;
  }
};

