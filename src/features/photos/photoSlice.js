import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const photosAdapter = createEntityAdapter()

const initialState = photosAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPhotosByAlbumId: builder.query({
         query: id => `/albums/${id}/photos`,
         transformResponse: responseData => {
            return photosAdapter.setAll(initialState, responseData)
         },
         providesTags: (result, error, arg) => [
             ...result.ids.map(id => ({ type: 'Photo', id }))
         ]
     }),

    })
})

export const {
    useGetPhotosByAlbumIdQuery,
} = extendedApiSlice
