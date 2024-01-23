import { vehicleType as selector } from "../Selectors/index";

export const vehicleTypeReducer = (state = [], { type, payload }) => {
  switch (type) {
    case selector.GET:
      return payload;

    default:
      return state;
  }
};
