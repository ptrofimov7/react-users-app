import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const albumsAdapter = createEntityAdapter()

const initialState = albumsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
     getAlbumsByUserId: builder.query({
      query: id => `/user/${id}/albums`,
      transformResponse: responseData => {
         return albumsAdapter.setAll(initialState, responseData)
      },
      providesTags: (result, error, arg) => [
          ...result.ids.map(id => ({ type: 'Album', id }))
      ]
  }),

    })
})

export const {
    useGetAlbumsByUserIdQuery,
} = extendedApiSlice
