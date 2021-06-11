import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import authReducer from "./auth/auth.reducer";
import metaReducer from "./meta/meta.reducer";
import postReducer from "./post/post.reducer";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
//   whitelist: ["posts"],
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  posts: postReducer,
  meta: metaReducer,
});

export default persistReducer(persistConfig, rootReducer);
