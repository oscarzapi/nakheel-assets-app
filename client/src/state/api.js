import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes:['SqlRequest'],
    endpoints: (build) => ({
        getSqlRequests: build.query({
            query: ({page, pageSize, sort, search}) => ({
                url: 'sql-requests',
                method: 'GET',
                params:{page, pageSize, sort, search}}),
            providesTags: ['SqlRequests']
    })
})
})

export const {
    useGetSqlRequestsQuery
} = api