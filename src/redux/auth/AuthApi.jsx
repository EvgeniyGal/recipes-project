// File: AuthApi.jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://project-ssback01.onrender.com';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    register: builder.mutation({
      query: values => ({
        url: '/users/register',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['User'],
    }),
    logIn: builder.mutation({
      query: values => ({
        url: '/users/login',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['User'],
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    updateAvatar: builder.mutation({
      query: ({ formData, token }) => {
        // const formData = new FormData();
        // formData.append('avatar', avatar);

        return {
          url: '/users/avatar',
          method: 'PATCH',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ['User'],
    }),
    fetchCurrentUser: builder.query({
      query: () => ({
        url: '/users/current',
      }),
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: id => ({
        url: `/users/${id}`,
      }),
      providesTags: ['User'],
    }),
    getFollowings: builder.query({
      query: () => ({
        url: `/users/followings`,
      }),
      providesTags: ['User'],
    }),
    getFollowers: builder.query({
      query: ({ id = null, page = 1, limit = 5 }) => {
        return {
          url: `/users/${id}/followers`,
          method: 'GET',
          params: { page, limit },
        };
      },
      providesTags: ['User'],
    }),
    addUserToFollowingList: builder.mutation({
      query: id => ({
        url: `/users/followings`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
    removeUserFromFollowingList: builder.mutation({
      query: id => ({
        url: `/users/followings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    addRecipeToFavoritesList: builder.mutation({
      query: id => ({
        url: `/users/recipes/favorite/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
    removeRecipeFromFavoritesList: builder.mutation({
      query: id => ({
        url: `/users/recipes/favorite/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    getFavoriteRecipesList: builder.query({
      query: ({ page = 1, limit = 10, id }) => ({
        url: '/users/recipes/favorite',
        method: 'GET',
        params: { page, limit, id },
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLogInMutation,
  useLogOutMutation,
  useFetchCurrentUserQuery,
  useUpdateAvatarMutation,
  useGetUserByIdQuery,
  useGetFollowersQuery,
  useGetFollowingsQuery,
  useAddUserToFollowingListMutation,
  useRemoveUserFromFollowingListMutation,
  useAddRecipeToFavoritesListMutation,
  useRemoveRecipeFromFavoritesListMutation,
  useGetFavoriteRecipesListQuery,
} = authApi;

export default authApi;
