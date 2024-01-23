import { expenseCategorySelectors as selector } from "../Selectors/index";

const initValue = {
  loading: false,
  rows: [],
};

export const expansesCategoryReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case selector.GET_EXPASE_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case selector.GET_EXPANSES_CATEGOR_SUCCESS:
      return {
        loading: false,
        rows: payload,
      };

    default:
      return state;
  }
};
