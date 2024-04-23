import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const chatApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["Chat"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: "/chats",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved }) {
        try {
          String(cacheEntryRemoved + arg);
          await cacheDataLoaded;
        } catch (error) {}
      },
      invalidatesTags: ["Chat"],
    }),
    getAllChatUser: builder.query({
      query: () => ({
        url: "/chats?_sort=updatedAt&_order=desc",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchChat: builder.mutation({
      query: (key) => ({
        url: `/chats/search?key=${key}&_sort=updatedAt&_order=desc`,
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetAllChatUserQuery,
  useSearchChatMutation,
} = chatApi;
