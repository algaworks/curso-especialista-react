import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../sdk/@types";

interface PostSliceState {
  paginated?: Post.Paginated;
}

const initialState: PostSliceState = {
  paginated: {
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 1,
    content: [],
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});

export const postReducer = postSlice.reducer;
