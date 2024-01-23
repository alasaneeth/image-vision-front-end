import { userActionSelectors } from "../Selectors/index";

const initValue = {
  loading: false,
  rows: [],
};

export const userTypeReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case userActionSelectors.GET_USER_TYPES:
      return {
        ...state,
        loading: true,
      };
    case userActionSelectors.GET_USER_TYPES_SUCCESS:
      return {
        loading: false,
        rows: payload,
      };

    default:
      return state;
  }
};
