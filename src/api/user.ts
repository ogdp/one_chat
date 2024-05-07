import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { IUpdateUser } from "@/interface";
import { IUpdatePass } from "@/interface/user";

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
    sendCodeMail: builder.mutation({
      query: () => ({
        url: `/users/getcode-mail/v1`,
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    changePassUser: builder.mutation({
      query: (payload: IUpdatePass) => ({
        url: `/users/update-password`,
        method: "PATCH",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
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
  useSendCodeMailMutation,
  useChangePassUserMutation,
} = userApi;
