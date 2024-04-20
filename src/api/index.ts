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
} from "./chat";

import customFetchBase, { socket } from "./customFetchBase";
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
  messageApi,
  useGetMessagesMutation,
  usePostMessageMutation,
  chatApi,
  useCreateChatMutation,
  useGetAllChatUserQuery,
  useSearchChatMutation,
  socket,
  customFetchBase,
};
