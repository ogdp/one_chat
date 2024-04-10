import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const messageApi = createApi({
  reducerPath: "messageApi",
  tagTypes: ["Message"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    // getMessages: builder.query({
    //   query: (chatId: string) => ({
    //     url: `/messages/${chatId}`,
    //     method: "GET",
    //     credentials: "include",
    //   }),
    //   providesTags: ["Message"],
    // }),
    getMessages: builder.mutation({
      query: (chatId: string) => ({
        url: `/messages/${chatId}`,
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
      invalidatesTags: ["Message"],
    }),
  }),
});

export const { useGetMessagesMutation, usePostMessageMutation } = messageApi;
