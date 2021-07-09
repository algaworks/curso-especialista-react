import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Post } from "../../sdk/@types";
import PostService from "../../sdk/services/Post.service";

interface PostSliceState {
  paginated?: Post.Paginated;
  fetching: boolean;
}

const initialState: PostSliceState = {
  fetching: false,
  paginated: {
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 1,
    content: [],
  },
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async function (query: Post.Query) {
    const posts = await PostService.getAllPosts(query);
    return posts;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post.Summary>) {
      state.paginated?.content?.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.paginated = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.fetching = true;
      })
      .addMatcher(isFulfilled, (state) => {
        state.fetching = false;
      });
  },
});

export const postReducer = postSlice.reducer;
export const { addPost } = postSlice.actions;
