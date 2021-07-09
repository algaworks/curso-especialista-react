import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { User } from "../../sdk/@types";
import UserService from "../../sdk/services/User.service";

export const fetchEditors = createAsyncThunk(
  "user/fetchEditors",
  async function () {
    const editors = await UserService.getAllEditors();
    return editors;
  }
);

interface UserSliceState {
  editors: User.EditorSummary[];
  fetching: boolean;
}

const initialState: UserSliceState = {
  fetching: false,
  editors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    const pendingActions = isPending(fetchEditors);
    const fulfilledActions = isFulfilled(fetchEditors);
    const rejectedActions = isRejected(fetchEditors);

    builder
      .addMatcher(pendingActions, (state) => {
        state.fetching = true;
      })
      .addMatcher(fulfilledActions, (state) => {
        state.fetching = false;
      })
      .addMatcher(rejectedActions, (state) => {
        state.fetching = false;
      });
  },
});

export const userReducer = userSlice.reducer;
