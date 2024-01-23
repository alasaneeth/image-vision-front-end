import { defaultLocationActionsSelectors as selector } from "../Selectors/index";



export const defaultLocation = (locationData) => {
    return {
        type: selector.SET_DEFAULT_LOCATION,
        payload: locationData,
    };
};
