import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase, { socket } from "./customFetchBase";

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
          const res = await cacheDataLoaded;
          // const socket = await getSocket();
          // console.log(res.data);
          // console.log(socket);
          // console.log(res.data._id);
          // socket.emit("join room", res.data._id);
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
