import { configureStore, isRejected, Middleware } from '@reduxjs/toolkit';
import { notification } from 'antd';
import PaymentReducer from './Payment.slice';
import UserReducer from './User.reducer';

const observeActions: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    notification.error({
      message: action.error.message,
    });
  }

  next(action);
};

export const store = configureStore({
  reducer: {
    user: UserReducer,
    payment: PaymentReducer,
  },
  middleware: function (getDefaultMiddlewares) {
    return getDefaultMiddlewares().concat(observeActions);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
