import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "@/api";
import { IPost } from "@/interface/post";

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: `/posts/all-posts`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    getOnePost: builder.query({
      query: (idPost: string) => ({
        url: `/posts/one-post/${idPost}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    getAllPostUser: builder.query({
      query: (idUser: string) => ({
        url: `/posts/all-post-user/${idUser}?_sort=createdAt&_order=desc`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    getAllPostOneUser: builder.mutation({
      query: (idUser: string) => ({
        url: `/posts/all-post-user/${idUser}?_sort=createdAt&_order=desc`,
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (payload: IPost) => ({
        url: "/posts",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (payload: IPost) => ({
        url: `/posts/${payload._id}`,
        method: "PATCH",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (idPost: string) => ({
        url: `/posts/${idPost}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
    actionsPost: builder.mutation({
      query: (payload: any) => ({
        url: `/posts/actionsPost/${payload.id}?actions=${payload.type}`,
        method: "POST",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useGetAllPostOneUserMutation,
  useGetAllPostUserQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useActionsPostMutation,
} = postApi;
