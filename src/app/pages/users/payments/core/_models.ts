import {ID, Response} from '../../../../../_metronic/helpers'

export type Payment = {
  id?: ID
  domain?: string
  mobile?: string
  msisdn?: string
  email?: string
  payment_id?: string
  amount?: string
  payment_date?: string
  payment_partner_id?: string | number
  payment_status?: string
  is_refunded?: boolean
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

export type PaymentsQueryResponse = Response<Array<Payment>>
