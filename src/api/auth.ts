import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    siginAccount: builder.mutation({
      query: (data) => ({
        url: "auth/signin",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    siginupAccount: builder.mutation({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    infoAccount: builder.query({
      query: () => ({
        url: "auth/get-user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Auth"],
    }),
    logoutAccount: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    updateInfor: builder.mutation({
      query: (user: any) => ({
        url: `auth/update-user/${user.id}`,
        method: "POST",
        body: user.data,
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    getCodeChangePassword: builder.mutation({
      query: () => ({
        url: "auth/send-code",
        method: "POST",
        credentials: "include",
      }),
    }),
    checkCodeChangePassword: builder.mutation({
      query: (data) => ({
        url: "auth/check-code",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "auth/change-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSiginAccountMutation,
  useSiginupAccountMutation,
  useInfoAccountQuery,
  useLogoutAccountMutation,
  useUpdateInforMutation,
  useGetCodeChangePasswordMutation,
  useCheckCodeChangePasswordMutation,
  useChangePasswordMutation,
} = authApi;
