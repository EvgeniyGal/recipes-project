import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// waiting for the back
export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-ssback01.onrender.com',
    refetchOnMountOrArgChange: 3,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Recipe'],

  // public endpoints
  endpoints: builder => ({
    getRecipes: builder.query({
      query: ({
        page = 1,
        limit = 12,
        category = null,
        area = null,
        ingredients = null,
        userId = null,
      }) => {
        const filter = { page, limit };
        if (category) {
          filter.category = category;
        }
        if (area) {
          filter.area = area;
        }
        if (ingredients) {
          filter.ingredients = ingredients;
        }
        if (userId) {
          filter.userId = userId;
        }
        return {
          url: '/recipes',
          method: 'GET',
          params: filter,
        };
      },
      providesTags: ['Recipe'],
    }),

    getPopularRecipes: builder.query({
      query: ({ page = 1, limit = 4, userId = null } = {}) => {
        const filter = { page, limit };
        if (userId) {
          filter.userId = userId;
        }
        return {
          url: '/recipes/popular/list',
          method: 'GET',
          params: filter,
        };
      },
      providesTags: ['Recipe'],
    }),

    getRecipeById: builder.query({
      query: ({ id, userId = null }) => {
        if (userId) {
          return {
            url: `/recipes/${id}`,
            method: 'GET',
            params: { id, userId },
          };
        } else {
          return {
            url: `/recipes/${id}`,
            method: 'GET',
          };
        }
      },
      providesTags: ['Recipe'],
    }),

    getUserRecipes: builder.query({
      query: ({ page = 1, limit = 10, id }) => {
        return {
          url: `/recipes/user/${id}`,
          method: 'GET',
          params: { page, limit },
        };
      },
      providesTags: ['Recipe'],
    }),

    //private endpoints
    addRecipe: builder.mutation({
      query: ({
        time,
        title,
        category,
        area,
        description,
        ingredients,
        instructions,
        thumb: recipes,
      }) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('area', area);
        formData.append('instructions', instructions);

        formData.append('description', description);
        ingredients.forEach((ingredient, index) => {
          formData.append(`ingredients[${index}][ingredient]`, ingredient.id);
          formData.append(`ingredients[${index}][measure]`, ingredient.measure);
        });
        formData.append('time', time);
        formData.append('recipe', recipes);

        return {
          url: '/recipes/personal',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Recipe'],
    }),
    getOwnRecipes: builder.mutation({
      query: ({ page = 1, limit = 9 }) => {
        const filter = { page, limit };
        return {
          url: '/recipes/personal/data',
          method: 'GET',
          params: filter,
        };
      },
      providesTags: ['Recipe'],
    }),

    removeRecipe: builder.mutation({
      query: id => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipe'],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetPopularRecipesQuery,
  useGetRecipeByIdQuery,
  useGetUserRecipesQuery,
  useAddRecipeMutation,
  useGetOwnRecipesMutation,
  useRemoveRecipeMutation,
} = recipesApi;
