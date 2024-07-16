import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {toast} from 'react-toastify'
import {BASE_URL} from '../../../app/constants/api.constants'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, {getState, endpoint}) => {
    headers.set('source', `${import.meta.env.VITE_SOURCE}`)
    headers.set('version', `${import.meta.env.VITE_VERSION}`)
    const authString = localStorage.getItem('user')
    const auth = authString ? JSON.parse(authString) : null
    headers.set('x-access-token', auth?.user?.access_token || '')
    return headers
  },
  // credentials: 'include',
})

export const apiSlice = createApi({
  reducerPath: 'api',
  refetchOnFocus: true,
  baseQuery: async (args, api, extraOptions) => {
    let result: any = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401) {
      localStorage.clear()
    }
    if (result?.error?.status === 403) {
      toast.error(result?.error?.data?.message || '403 Forbidden')
    }
    return result
  },
  tagTypes: ['Section', 'Subsection', 'Permission', 'Roles', 'Posts', 'PostsCategory', 'JobPosts'],
  endpoints: (builder) => ({}),
})
