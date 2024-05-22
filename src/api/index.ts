import customFetchBase, { socket } from "./customFetchBase";

// Auth API
import {
  authApi,
  useSiginAccountMutation,
  useSiginupAccountMutation,
  useLogoutAccountMutation,
} from "./auth";
// User API
import {
  userApi,
  useGetUserSuggestQuery,
  useGetGuestQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useLazyGetMeQuery,
  useLazySearchUserQuery,
  useSendCodeMailMutation,
  useChangePassUserMutation,
} from "./user";
import {
  messageApi,
  useGetMessagesMutation,
  usePostMessageMutation,
} from "./message";
import {
  chatApi,
  useCreateChatMutation,
  useGetAllChatUserQuery,
  useSearchChatMutation,
  useDeleteChatMutation,
} from "./chat";
import {
  postApi,
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useGetAllPostUserQuery,
  useGetAllPostOneUserMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useActionsPostMutation,
} from "./post";

import { locationApi, useGetLocationMutation } from "./location";
import { imagesApi, useUploadImagesMutation } from "./images";

export {
  authApi,
  useSiginAccountMutation,
  useSiginupAccountMutation,
  useLogoutAccountMutation,
  userApi,
  useGetUserSuggestQuery,
  useGetGuestQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useLazyGetMeQuery,
  useLazySearchUserQuery,
  useSendCodeMailMutation,
  useChangePassUserMutation,
  messageApi,
  useGetMessagesMutation,
  usePostMessageMutation,
  chatApi,
  useCreateChatMutation,
  useGetAllChatUserQuery,
  useSearchChatMutation,
  useDeleteChatMutation,
  postApi,
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useGetAllPostUserQuery,
  useGetAllPostOneUserMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useActionsPostMutation,
  socket,
  customFetchBase,
  locationApi,
  useGetLocationMutation,
  imagesApi,
  useUploadImagesMutation,
};