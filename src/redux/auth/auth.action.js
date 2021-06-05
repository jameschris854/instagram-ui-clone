import authActionTypes from "./auth.types";

export const setAuthState = (authState) => ({
    type:authActionTypes.SET_AUTH_STATE,
    payload:authState
})