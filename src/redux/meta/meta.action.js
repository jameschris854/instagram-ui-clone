import metaActionTypes from "./meta.types";

export const setNavbarTab = (tab) => ({
    type:metaActionTypes.SET_NAVBAR_TAB,
    payload:tab
})

export const setTheme = (theme) => ({
    type:metaActionTypes.SET_THEME_DATA,
    payload:theme==='dark'?'white':'dark'
})