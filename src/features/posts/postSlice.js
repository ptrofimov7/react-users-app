import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter()

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getPostsByUserId: builder.query({
            query: id => `/user/${id}/posts`,
            transformResponse: responseData => {
               return postsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),

    })
})

export const {
    useGetPostsByUserIdQuery,
} = extendedApiSlice
