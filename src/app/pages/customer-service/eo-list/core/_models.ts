import {ID, Response} from '../../../../../_metronic/helpers'

export type Role = {
  id?: ID
  name?: string
}

export type STP = {
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
  // * Actual
  Branch?: string
  District?: string
  RetailerName?: string
  Address?: string
  Contact?: string
  setting_id?: any
  action_type?: any
  setting_name?: any
  setting_data?: any
  'Sl. No.'?: any
}

export type STPsQueryResponse = Response<Array<STP>>

export const initialSTP: STP = {
  avatar: 'avatars/300-6.jpg',
  msisdn: '',
  type: 'guest',
  name: '',
  email: '',
}
