import { servicePack } from "../Selectors/index";

const initValue = {
  loading: false,
  rows: [],
};

export const servicePacks = (state = initValue, { type, payload }) => {
  switch (type) {
    case servicePack.GET:
      return {
        ...state,
        loading: true,
      };
    case servicePack.GET_SUCCESS:
      return {
        loading: false,
        rows: payload,
      };

    default:
      return state;
  }
};
