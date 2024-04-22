import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { IUpdateUser } from "@/interface";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getMe: builder.query({
      query: (me: string) => ({
        url: `/users/${me}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (user: IUpdateUser) => ({
        url: `/users`,
        method: "PATCH",
        body: user,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getGuest: builder.query({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    searchUser: builder.query({
      query: (key: string, options?: string | "") => ({
        url: `/users/search/top?key=${key}${
          options !== undefined ? options : ""
        }`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetGuestQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useSearchUserQuery,
  useLazySearchUserQuery,
  useLazyGetMeQuery,
} = userApi;
