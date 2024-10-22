import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  postItem: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePostItem: (state, action) => {
      state.postItem = action.payload;
    },
    resetPostItem: (state, action) => {
      state.postItem = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePostItem, resetPostItem } = postSlice.actions;

export default postSlice.reducer;
