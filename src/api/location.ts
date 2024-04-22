import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  // Set the baseUrl for every endpoint below
  reducerPath: "locationApi",
  tagTypes: ["Location"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vapi.vnappmob.com/api/province/",
  }),
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: (endpoint?: string) => `${endpoint}`,
      providesTags: ["Location"],
    }),
    // updatePokemon: builder.mutation({
    //   query: ({ name, patch }) => ({
    //     url: `pokemon/${name}`,
    //     // When performing a mutation, you typically use a method of
    //     // PATCH/PUT/POST/DELETE for REST endpoints
    //     method: "PATCH",
    //     // fetchBaseQuery automatically adds `content-type: application/json` to
    //     // the Headers and calls `JSON.stringify(patch)`
    //     body: patch,
    //   }),
    // }),
  }),
});

export const { useGetLocationQuery } = locationApi;
