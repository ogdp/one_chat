import { configureStore } from "@reduxjs/toolkit";
import {
  authApi,
  messageApi,
  userApi,
  chatApi,
  locationApi,
  imagesApi,
  postApi,
} from "@/api";
import { chatSlices, homeSlices, profilesSlices } from "@/slices";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [imagesApi.reducerPath]: imagesApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    chatSlices: chatSlices,
    homeSlices: homeSlices,
    profilesSlices: profilesSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      authApi.middleware,
      userApi.middleware,
      messageApi.middleware,
      chatApi.middleware,
      locationApi.middleware,
      imagesApi.middleware,
      postApi.middleware
    ),
});
