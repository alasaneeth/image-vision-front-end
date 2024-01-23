import { defaultLocationActionsSelectors as selector } from "../Selectors/index";
const initValue = {
    location: {
        code: '',
        name:''
    }
  };

export const defaultLocationReducer = (state = initValue, { type, payload }) => {
    switch (type) {
      case selector.SET_DEFAULT_LOCATION:
        return {
            location: payload,
        };
      default:
        return state;
    }
  };