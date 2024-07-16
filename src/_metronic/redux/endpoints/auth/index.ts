export const AUTH = {
  LOGIN: '/auth/user/sign-in',
  USER: '/auth/users',
  PROFILE_UPDATE: '/auth/user/info/update',
  PERMISSION_LIST: '/auth/permission/list',
  PERMISSION: '/auth/permission',
  SECTION: '/auth/permission-group',
  APIS: '/auth/api-uri',
  PERMISSION_GROUP: '/auth/permission/group',
  ROLE: '/auth/role',
  ROLE_WITH_PERMISSION: '/auth/role-with-permission',
  ROLE_PERMISSION: (id: string) => `/auth/role/${id}/permissions`,
  USER_PERMISSIONS: '/auth/user-permissions',
  STORE: '/auth/store',
  STORE_SWITCH: '/auth/store/switch',
}

export const PERMISSION = {}
