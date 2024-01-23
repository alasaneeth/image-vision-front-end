import { activeUserActionSelectors as selector } from "../Selectors/index";
const initValue = {
  loading: false,
  rows: [],
};
export const activeUserReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case selector.GET_ACTIVE_USER:
      return {
        ...state,
        loading: true,
      };
    case selector.GET_ACTIVE_USER_SUCCESS:
      return {
        loading: false,
        rows: payload,
      };

    default:
      return state;
  }
};
