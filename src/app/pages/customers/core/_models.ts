import {ID, Response} from '../../../../_metronic/helpers'

export type User = {
  id?: ID
  name?: string
  avatar?: string
  profile?: string
  email?: string
  msisdn?: string
  type?: string
  updated_at?: string
  addresses?: any
  country?: any
  created_at?: any
  total_order_canceled?: any
  total_order_committed?: any
  total_order_delivered?: any
  total_order_placed?: any
  total_shopping_value?: any
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  profile: 'avatars/300-6.jpg',
  msisdn: '',
  type: 'guest',
  name: '',
  email: '',
}
