import {
  createAsyncThunk,
  createReducer,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { notification } from 'antd';
import { User, UserService } from 'danielbonifacio-sdk';

interface UserState {
  list: User.Summary[];
  fetching: boolean;
}

const initialState: UserState = {
  fetching: false,
  list: [],
};

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async () => UserService.getAllUsers()
);

export const toggleUserStatus = createAsyncThunk(
  'user/toggleUserStatus',
  async (user: User.Summary | User.Detailed) => {
    user.active
      ? await UserService.deactivateExistingUser(user.id)
      : await UserService.activateExistingUser(user.id);

    return user;
  }
);

export default createReducer(initialState, (builder) => {
  const success = isFulfilled(
    getAllUsers,
    toggleUserStatus
  );
  const error = isRejected(getAllUsers, toggleUserStatus);
  const loading = isPending(getAllUsers, toggleUserStatus);

  builder
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    .addMatcher(success, (state) => {
      state.fetching = false;
    })
    .addMatcher(error, (state, action) => {
      state.fetching = false;
      notification.error({
        message: action.error.message,
      });
    })
    .addMatcher(loading, (state) => {
      state.fetching = true;
    });
});
