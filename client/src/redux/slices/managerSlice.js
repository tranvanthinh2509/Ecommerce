import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  managerPost: false,
};

export const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    handleManagerPost: (state, action) => {
      state.managerPost = !state.managerPost;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleManagerPost } = managerSlice.actions;

export default managerSlice.reducer;
