import { configureStore } from "@reduxjs/toolkit";

import { authApi, userApi } from "@/api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(authApi.middleware, userApi.middleware),
});
