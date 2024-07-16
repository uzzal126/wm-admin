import {JOB} from '../../endpoints'
import {apiSlice} from '../apiSlice'

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    jobPost: builder.query({
      query: (query) => `${JOB.POST}?${query}`,
      providesTags: ['JobPosts'],
    }),
    jobPostBySlug: builder.query({
      query: (slug) => `${JOB.POST}/${slug}`,
      providesTags: ['JobPosts'],
    }),
    addJobPost: builder.mutation({
      query: (post) => ({
        url: JOB.POST,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['JobPosts'],
    }),
    updateJobPost: builder.mutation({
      query: (post) => ({
        url: `${JOB.POST}/${post.id}`,
        method: 'PUT',
        body: post.data,
      }),
      invalidatesTags: ['JobPosts'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${JOB.POST}/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['JobPosts'],
    }),
  }),
})

export const {
  useAddJobPostMutation,
  useJobPostBySlugQuery,
  useDeletePostMutation,
  useJobPostQuery,
  useUpdateJobPostMutation,
} = jobApi
