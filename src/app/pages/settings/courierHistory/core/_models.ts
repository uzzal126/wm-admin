import {ID, Response} from '../../../../../_metronic/helpers'

export type TableModal = {
  id?: ID
  location?: string
  price_for_merchants_per_kg?: string
  additional_charge_per_kg?: string
  cash_on_delivery_percentage?: string
  status?: string
  active_time?: string
  expire_time?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>
