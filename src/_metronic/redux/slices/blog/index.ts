import {BLOG} from '../../endpoints'
import {apiSlice} from '../apiSlice'

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    posts: builder.query({
      query: (query) => `${BLOG.POST}?${query}`,
      providesTags: ['Posts'],
    }),
    postBySlug: builder.query({
      query: (slug) => `${BLOG.BY_SLUG}/${slug}`,
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: BLOG.POST,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `${BLOG.POST}/${post.id}`,
        method: 'PUT',
        body: post.data,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${BLOG.POST}/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Posts'],
    }),

    postCategories: builder.query({
      query: (query) => `${BLOG.CATEGORY}?${query}`,
      providesTags: ['PostsCategory'],
    }),
    addCategory: builder.mutation({
      query: (post) => ({
        url: BLOG.CATEGORY,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['PostsCategory'],
    }),
    updateCategory: builder.mutation({
      query: (post) => ({
        url: `${BLOG.CATEGORY}/${post.id}`,
        method: 'PUT',
        body: post.data,
      }),
      invalidatesTags: ['PostsCategory'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${BLOG.CATEGORY}/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['PostsCategory'],
    }),
  }),
})

export const {
  useAddCategoryMutation,
  useAddPostMutation,
  usePostBySlugQuery,
  useDeleteCategoryMutation,
  useDeletePostMutation,
  usePostCategoriesQuery,
  usePostsQuery,
  useUpdateCategoryMutation,
  useUpdatePostMutation,
} = blogApi
