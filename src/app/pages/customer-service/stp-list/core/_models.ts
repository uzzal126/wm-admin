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
  Address_Bangla?: string
  Address_English?: string
  Branch?: string
  'Contact Person'?: string
  'Contact Person Number'?: string
  'RCCM Contact Number'?: string
  'RCCM Name'?: string
  Region?: string
  'Sl. No.'?: string
  'Service Hour'?: string
  Weekend?: string
  setting_data?: any
  action_type?: any
  setting_name?: any
}

export type STPsQueryResponse = Response<Array<STP>>

export const initialSTP: STP = {
  avatar: 'avatars/300-6.jpg',
  msisdn: '',
  type: 'guest',
  name: '',
  email: '',
}
