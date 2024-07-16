import {AUTH} from '../../endpoints'
import {apiSlice} from '../apiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),

    getAPIs: builder.query({
      query: () => AUTH.APIS,
    }),

    getSections: builder.query({
      query: () => AUTH.SECTION,
      providesTags: ['Section'],
    }),

    addSection: builder.mutation({
      query: (post) => ({
        url: AUTH.SECTION,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Section'],
    }),
    editSection: builder.mutation({
      query: (post) => ({
        url: `${AUTH.SECTION}/${post.id}`,
        method: 'PUT',
        body: post.data,
      }),
      invalidatesTags: ['Section'],
    }),

    deleteSection: builder.mutation({
      query: (id) => ({
        url: `${AUTH.SECTION}/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Section'],
    }),

    getSubsections: builder.query({
      query: (param) => `${AUTH.PERMISSION}${param}`,
      providesTags: ['Subsection'],
    }),

    addSubsection: builder.mutation({
      query: (post) => ({
        url: AUTH.PERMISSION,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Subsection'],
    }),
    editSubsection: builder.mutation({
      query: (post) => ({
        url: `${AUTH.PERMISSION}/${post.id}`,
        method: 'PUT',
        body: post.data,
      }),
      invalidatesTags: ['Subsection'],
    }),

    deleteSubsection: builder.mutation({
      query: (id) => ({
        url: `${AUTH.PERMISSION}/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Subsection'],
    }),

    getPermissionGroup: builder.query({
      query: () => `${AUTH.PERMISSION_GROUP}`,
      // providesTags: ['Subsection'],
    }),
    getPermissions: builder.query({
      query: () => `${AUTH.PERMISSION}`,
      providesTags: ['Permission'],
    }),
    addPermission: builder.mutation({
      query: (post) => ({
        url: AUTH.PERMISSION,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Permission'],
    }),
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `${AUTH.PERMISSION}/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Permission'],
    }),

    getRoles: builder.query({
      query: () => `${AUTH.ROLE}`,
      providesTags: ['Roles'],
    }),
    getRole: builder.query({
      query: (id) => AUTH.ROLE_PERMISSION(id),
      providesTags: ['Roles'],
    }),
    getRoleById: builder.query({
      query: (id) => `${AUTH.ROLE}/${id}`,
    }),
    getStore: builder.query({
      query: (param) => `${AUTH.STORE}${param}`,
    }),

    addRole: builder.mutation({
      query: (post) => ({
        url: `${AUTH.ROLE_WITH_PERMISSION}`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Roles'],
    }),

    editRole: builder.mutation({
      query: (post) => ({
        url: `${AUTH.ROLE_WITH_PERMISSION}/${post.id}`,
        method: 'PUT',
        body: post.data,
      }),
      invalidatesTags: ['Subsection'],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `${AUTH.ROLE}/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Roles'],
    }),

    addUser: builder.mutation({
      query: (post) => ({
        url: `${AUTH.USER}`,
        method: 'POST',
        body: post,
      }),
    }),
    editUser: builder.mutation({
      query: (post) => ({
        url: `${AUTH.USER}/${post.id}`,
        method: 'PUT',
        body: post.data,
      }),
    }),
    storeSwitch: builder.mutation({
      query: (post) => ({
        url: `${AUTH.STORE_SWITCH}`,
        method: 'POST',
        body: post,
      }),
    }),

    getUserPermissions: builder.query({
      query: () => `${AUTH.USER_PERMISSIONS}`,
    }),
  }),
})

export const {
  useLoginMutation,
  useGetAPIsQuery,
  useAddSectionMutation,
  useGetSectionsQuery,
  useDeleteSectionMutation,
  useEditSectionMutation,
  useAddSubsectionMutation,
  useGetSubsectionsQuery,
  useDeleteSubsectionMutation,
  useEditSubsectionMutation,
  useGetPermissionGroupQuery,
  useAddPermissionMutation,
  useGetPermissionsQuery,
  useDeletePermissionMutation,
  useAddRoleMutation,
  useGetRolesQuery,
  useGetRoleQuery,
  useEditRoleMutation,
  useDeleteRoleMutation,
  useGetRoleByIdQuery,
  useAddUserMutation,
  useGetStoreQuery,
  useGetUserPermissionsQuery,
  useEditUserMutation,
  useStoreSwitchMutation,
} = authApi
