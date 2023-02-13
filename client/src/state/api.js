import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes:['SqlRequest'],
    endpoints: (build) => ({
        getSqlRequests: build.query({
            query: ({tenant}) => ({
                url: 'sql-requests',
                method:'GET',
                params: {tenant}
            }),
            providesTags: ['SqlRequest']
        })
    })
})

export const {
    useGetSqlRequestsQuery
} = api