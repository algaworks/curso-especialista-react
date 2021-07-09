import { configureStore } from "@reduxjs/toolkit";
import { editorReducer } from "./Editor.store";
import { postReducer } from "./Post.slice";
import { userReducer } from "./User.slice";

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    editor: editorReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
