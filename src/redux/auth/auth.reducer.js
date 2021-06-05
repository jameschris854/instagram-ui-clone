import authActionTypes from "./auth.types";

const INITIAL_STATE = { authData:{isAuthenticated:false,token:null} };

const authReducer = (state=INITIAL_STATE,action) => {
    switch (action.type) {
        case authActionTypes.SET_AUTH_STATE:
            return {
                ...state,
                authData:action.payload 
            }
        default:
            return state
    }
}

export default authReducer;