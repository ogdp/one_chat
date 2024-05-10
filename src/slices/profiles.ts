// slices/chat.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toogleEditUser: false,
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
  },
});

export const { openEditUser, closeEditUser } = profilesSlices.actions;
export default profilesSlices.reducer;
