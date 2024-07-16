import {Response} from '../../../../../../_metronic/helpers'

export type TableModal = {
  date?: string
  invoice_id?: string
  customer_name?: string
  return_date?: string
  status?: string
  product_name?: string
}

export type TableModalsQueryResponse = Response<Array<TableModal>>
