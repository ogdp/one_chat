// slices/chat.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

const chatSlices = createSlice({
  name: "iconModel",
  initialState,
  reducers: {
    openIconModel: (state) => {
      state.status = true;
    },
    closeIconModel: (state) => {
      state.status = false;
    },
  },
});

export const { openIconModel, closeIconModel } = chatSlices.actions;
export default chatSlices.reducer;
