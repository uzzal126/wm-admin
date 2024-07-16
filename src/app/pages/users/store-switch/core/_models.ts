import {ID, Response} from '../../../../../_metronic/helpers'

export type TableModal = {
  id?: ID
  domain?: string
  logo?: {
    fav_icon: string
    fav_logo: string
    dark_logo: string
    light_logo: string
  }
  sid?: string
  email?: string
  active_time?: string
  expire_time?: number
  store_category?: string
  publish_status?: string
  created_at?: string
  msisdn?: string
  business_address?: string
  lang?: string
  country?: string
  payments?: any
}

export type TableModalsQueryResponse = Response<Array<TableModal>>
