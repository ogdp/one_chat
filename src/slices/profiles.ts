// slices/chat.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toogleEditUser: false,
  toogleActionPost: false,
};

const profilesSlices = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    openEditUser: (state) => {
      state.toogleEditUser = true;
    },
    closeEditUser: (state) => {
      state.toogleEditUser = false;
    },
    onActionPost: (state) => {
      state.toogleActionPost = true;
    },
    offActionPost: (state) => {
      state.toogleActionPost = false;
    },
  },
});

export const { openEditUser, closeEditUser, onActionPost, offActionPost } =
  profilesSlices.actions;
export default profilesSlices.reducer;
