import { salesRepActionSelectors as selector } from "../Selectors/index";
const initValue = {
  loading: false,
  rows: [],
};
export const routeReducer = (state = initValue, { type, payload }) => {
  switch (type) {
    case selector.GET_ROUTE:
      return {
        ...state,
        loading: true,
      };
    case selector.GET_ROUTE_SUCCESS:
      return {
        loading: false,
        rows: payload,
      };

    default:
      return state;
  }
};
