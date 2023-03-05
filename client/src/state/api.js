import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["SqlRequest", "UpdateComment", "GetData"],
  endpoints: (build) => ({
    getSqlRequests: build.query({
      query: ({ page, pageSize, sort, tcode }) => ({
        url: "sql-requests",
        method: "GET",
        params: { page, pageSize, sort, tcode },
      }),
      providesTags: ["SqlRequests"],
    }),
    updateComments: build.query({
      query: ({ keyToUpdateComment, comment }) => ({
        url: "sql-requests/updated-comments",
        method: "GET",
        params: { keyToUpdateComment, comment },
      }),
      providesTags: ["UpdateComments"],
    }),
    getData: build.query({
        query: ( email ) => ({
          url: "sql-requests/data",
          method: "GET",
          params: { email },
        }),
        providesTags: ["GetData"],
      }),
  }),
});

export const {
  useGetSqlRequestsQuery,
  useLazyUpdateCommentsQuery,
  useLazyGetSqlRequestsQuery,
  useLazyGetDataQuery
} = api;
