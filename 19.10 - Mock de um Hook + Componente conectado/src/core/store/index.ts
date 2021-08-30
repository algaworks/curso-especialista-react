import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth.slice";
import { editorReducer } from "./Editor.store";
import { postReducer } from "./Post.slice";
import { userReducer } from "./User.slice";

export function createAppStore() {
  return configureStore({
    reducer: {
      post: postReducer,
      user: userReducer,
      editor: editorReducer,
      auth: authReducer,
    },
  });
}

const store = createAppStore();

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
