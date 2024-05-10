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
  useGetAllPostOneUserMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "./post";

import { locationApi, useGetLocationMutation } from "./location";
import { imagesApi, useUploadImagesMutation } from "./images";

export {
  authApi,
  useSiginAccountMutation,
  useSiginupAccountMutation,
  useLogoutAccountMutation,
  userApi,
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
  useGetAllPostOneUserMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  socket,
  customFetchBase,
  locationApi,
  useGetLocationMutation,
  imagesApi,
  useUploadImagesMutation,
};
