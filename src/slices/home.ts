// slices/home.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

const homeSlices = createSlice({
  name: "postModel",
  initialState,
  reducers: {
    openPostModel: (state) => {
      state.status = true;
    },
    closePostModel: (state) => {
      state.status = false;
    },
  },
});

export const { openPostModel, closePostModel } = homeSlices.actions;
export default homeSlices.reducer;
