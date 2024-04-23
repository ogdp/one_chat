import { configureStore } from "@reduxjs/toolkit";
import {
  authApi,
  messageApi,
  userApi,
  chatApi,
  locationApi,
  imagesApi,
} from "@/api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [imagesApi.reducerPath]: imagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      authApi.middleware,
      userApi.middleware,
      messageApi.middleware,
      chatApi.middleware,
      locationApi.middleware,
      imagesApi.middleware
    ),
});