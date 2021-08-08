import metaActionTypes from "./meta.types";

const INITIAL_STATE = { theme: "white", navbarTab: "home" ,loader: false };

const metaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case metaActionTypes.SET_THEME_DATA:
      return {
        ...state,
        theme: action.payload,
      };
    case metaActionTypes.SET_NAVBAR_TAB:
      return {
        ...state,
        navbarTab: action.payload,
      };
    case metaActionTypes.SET_LOADER_STATE:
      return {
        ...state,
        loader: action.payload,
      }
    default:
      return state;
  }
};

export default metaReducer;
