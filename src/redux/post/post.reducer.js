import postActionTypes from "./post.types"

const INITIAL_STATE = {posts:null}

const postReducer = (state=INITIAL_STATE,action) => {
    switch (action.type) {
        case postActionTypes.FETCH_POSTS_DATA:
            return{
                ...state,
                posts : action.payload
            }
        default:
            return state
    }
}

export default postReducer;