import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase, socket } from "@/api";

export const messageApi = createApi({
  reducerPath: "messageApi",
  tagTypes: ["Message"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getMessages: builder.mutation({
      query: (chatId: string) => ({
        url: `/messages/${chatId}?_sort=createdAt&_order=desc&_limit=3`,
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Message"],
    }),
    postMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved }) {
        try {
          String(cacheEntryRemoved + arg);
          const res = await cacheDataLoaded;
          socket.emit("new message", res?.data?.mess);
        } catch (error) {}
      },

      invalidatesTags: ["Message"],
    }),
  }),
});

export const { useGetMessagesMutation, usePostMessageMutation } = messageApi;
