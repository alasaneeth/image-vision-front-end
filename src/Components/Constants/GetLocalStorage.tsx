import { LOCAL_STORAGE } from "./LocalStorage";

export const GET_LOCAL_STORAGE = {
    BIZX_LOCATION: JSON.parse(localStorage.getItem(LOCAL_STORAGE.BIZX_LOCATION) || '{}'),
}