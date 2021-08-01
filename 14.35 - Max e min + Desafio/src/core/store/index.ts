import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './User.reducer';

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
