import { ID, Response } from "../../../../../_metronic/helpers"

export type TableModal = {
  id?: ID
  request_id?: string
  customer_name?: string
  customer_msisdn?: string
  customer_email?: string
  delivery_address?: string
  is_order_accepted?: string
  created_at?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>

export const initiaTableModal: TableModal = {
  customer_name: 'jone',
  customer_msisdn: '',
  customer_email: '',
  delivery_address: '',
}
