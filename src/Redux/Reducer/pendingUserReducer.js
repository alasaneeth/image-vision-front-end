import { pendingUserActionSelectors as selector } from "../Selectors/index";
const initValue = {
  loading: false,
  rows: [],
};
export const pendingUserReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case selector.GET_PENDING_USER:
      return {
        ...state,
        loading: true,
      };
    case selector.GET_PENDING_USER_SUCCESS:
      return {
        loading: false,
        rows: payload,
      };

    default:
      return state;
  }
};
