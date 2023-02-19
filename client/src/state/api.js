import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes:['SqlRequest', 'UpdateComment'],
    endpoints: (build) => ({
        getSqlRequests: build.query({
            query: ({page, pageSize, sort, tcode}) => ({
                url: 'sql-requests',
                method: 'GET',
                params:{page, pageSize, sort, tcode}}),
            providesTags: ['SqlRequests']
    }),
    updateComments: build.query({
        query: ({keyToUpdateComment, comment}) => ({
            url: 'sql-requests/update-comment',
            method: 'GET',
            params:{keyToUpdateComment, comment}}),
        providesTags: ['UpdateComments']
})
})
})

export const {
    useGetSqlRequestsQuery, useUpdateCommentsQuery
} = api