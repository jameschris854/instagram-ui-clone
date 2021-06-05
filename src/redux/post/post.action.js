import postActionTypes from "./post.types";

export const setPostData = (posts) => ({
    type:postActionTypes.FETCH_POSTS_DATA,
    payload:posts
})