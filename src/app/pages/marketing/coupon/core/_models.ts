import {ID, Response} from '../../../../../_metronic/helpers'

export type Coupon = {
  id?: ID
  promo_code?: string
  start_in?: any
  end_in?: any
  percent?: String
  amount?: String
  validity?: Number
  max_use_limit?: Number
  per_user_limit?: Number
  active_status?: string
  discount_type?: string
  application_type?: string
  thumbnail?: string
  banner?: string
  updated_at?: string
  created_at?: any
  max_discount_limit?: string | number
  min_order_value?: any
  items?: any
}

export type CouponsQueryResponse = Response<Array<Coupon>>

export const initialCoupon: Coupon = {
  start_in: '',
  percent: '',
  promo_code: '',
  end_in: '',
}
