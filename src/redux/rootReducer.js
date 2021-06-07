import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import metaReducer from './meta/meta.reducer';
import postReducer from './post/post.reducer';

import userReducer from './user/user.reducer'

export default combineReducers({
    user : userReducer,
    auth: authReducer,
    posts:postReducer,
    meta:metaReducer
})