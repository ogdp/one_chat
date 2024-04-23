import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const imagesApi = createApi({
  reducerPath: "imagesApi",
  tagTypes: ["Image"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    uploadImages: builder.mutation({
      query: (file: any) => {
        const formData = new FormData();
        formData.append("images", file);
        return {
          url: `/images/upload`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Image"],
    }),
  }),
});

export const { useUploadImagesMutation } = imagesApi;
