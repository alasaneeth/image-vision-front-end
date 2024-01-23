import { expensesActionSelectors as selector } from "../Selectors/index";

const initValue = {
  loading: false,
  rows: [],
};

export const expensesTypeReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case selector.GET_EXPENSES_TYPE:
      return {
        ...state,
        loading: true,
      };
    case selector.GET_EXPENSES_TYPE_SUCCESS:
      return {
        loading: false,
        rows: payload,
      };

    default:
      return state;
  }
};
