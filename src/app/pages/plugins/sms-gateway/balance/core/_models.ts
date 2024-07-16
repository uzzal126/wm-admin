import {ID, Response} from '../../../../../../_metronic/helpers'

export type Bundle = {
  id?: ID
  amount?: number
  status?: any
  number_of_sms?: number
  total_price?: number
  account_type?: string
  price?: number
  pricing?: number
  title?: string
  sms?: number
  remarks?: string
  attachments?: any
  slug?: string
  name?: string
  text?: string
  requested_by?: string
  approved_at?: string
  created_by?: string
  updated_by?: string
  created_at?: string
  updated_at?: string
}

export type SMS = {
  id?: ID
  group?: any
  mobile?: []
  type?: string
  content?: string
  send_now?: boolean
  scheduled_at?: any
}

export type BundlesQueryResponse = Response<Array<Bundle>>
