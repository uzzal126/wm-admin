import {ID, Response} from '../../../../_metronic/helpers'

export type Role = {
  id?: ID
  name?: string
}

export type User = {
  store_id?: ID
  id?: ID
  sid?: string
  name?: string
  avatar?: string
  password?: string
  email?: string
  msisdn?: string
  type?: string
  address?: any
  domain?: any
  role_ids?: ID[]
  roles?: Role[] | undefined
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  msisdn: '',
  type: 'guest',
  name: '',
  email: '',
}
