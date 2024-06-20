import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testimonialsApi = createApi({
  reducerPath: 'testimonialsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-ssback01.onrender.com',
  }),
  tagTypes: ['Testimonial'],
  endpoints: builder => ({
    getTestimonials: builder.query({
      query: () => '/testimonials',
      providesTags: ['Testimonial'],
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialsApi;
