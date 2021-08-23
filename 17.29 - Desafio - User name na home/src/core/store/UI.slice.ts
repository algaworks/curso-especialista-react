import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  breadcrumb: string[];
}

const initialState: UIState = {
  breadcrumb: [],
};

const uiSlice = createSlice({
  initialState,
  name: 'ui',
  reducers: {
    setBreadcrumb(state, action: PayloadAction<string[]>) {
      state.breadcrumb = action.payload;
    },
  },
});

export const { setBreadcrumb } = uiSlice.actions;

const uiReducer = uiSlice.reducer;
export default uiReducer;
