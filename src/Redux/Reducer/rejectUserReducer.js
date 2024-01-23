import { rejectUserActionSelectors as selector } from "../Selectors/index";
const initValue = {
  loading: false,
  rows: [],
};
export const rejectUserReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case selector.GET_REJECT_USER:
      return {
        ...state,
        loading: true,
      };
    case selector.GET_REJECT_USER_SUCCESS:
      return {
        loading: false,
        rows: payload,
      };

    default:
      return state;
  }
};
