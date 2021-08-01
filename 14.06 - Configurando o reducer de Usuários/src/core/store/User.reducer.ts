import {
  createAsyncThunk,
  createReducer,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
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

export default createReducer(initialState, (builder) => {
  const success = isFulfilled(getAllUsers);
  const error = isRejected(getAllUsers);
  const loading = isPending(getAllUsers);

  builder
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    .addMatcher(success, (state) => {
      state.fetching = false;
    })
    .addMatcher(error, (state) => {
      state.fetching = false;
    })
    .addMatcher(loading, (state) => {
      state.fetching = true;
    });
});
