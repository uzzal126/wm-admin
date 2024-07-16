import {ID, Response} from '../../../../../../../../_metronic/helpers'

export type User = {
  id?: ID
  courier_partner_id?: string
  store_name?: string
  contact_name?: string
  contact_number?: string
  address?: string
  city_id?: number
  zone_id?: number
  area_id?: number
  is_default?: number
  createdat?: string
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  store_name: '',
  contact_name: '',
  contact_number: '',
  address: '',
  zone_id: 0,
  city_id: 0,
  area_id: 0,
}
