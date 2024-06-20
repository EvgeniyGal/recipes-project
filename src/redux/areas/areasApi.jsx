import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const areasApi = createApi({
  reducerPath: 'areasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-ssback01.onrender.com',
  }),
  tagTypes: ['Area'],
  endpoints: builder => ({
    getAreas: builder.query({
      query: () => '/areas',
      providesTags: ['Area'],
    }),
  }),
});

export const { useGetAreasQuery } = areasApi;
