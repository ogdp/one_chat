import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase, { getSocket } from "./customFetchBase";

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
      // async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved }) {
      //   try {
      //     const res = await cacheDataLoaded;
      //     const socket = await getSocket();
      //     console.log(res.data);
      //     console.log(socket);
      //     // socket.emit("join room", res.data._id);
      //   } catch (error) {}
      // },
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const { useCreateChatMutation } = chatApi;
